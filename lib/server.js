/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:29:06
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-12 12:45:11
 */

'use strict'

const _ = require('lodash')
const joi = require('joi')
const cors = require('cors')
const spdy = require('spdy')
const cluster = require('cluster')
const sticky = require('socketio-sticky-session')
const Boom = require('boom')
const BoomNotImplemented = Boom.notImplemented
const BoomMethodNotAllowed = Boom.methodNotAllowed

const pify = require('pify')
const pem = pify(require('pem'))

const utils = require('./utils')

module.exports = {
  serverRoutes: {},
  nativeServer: {},

  /**
   * Create Koa server
   * @param  {object} app Trails.JS App
   * @return {object}     Koa's instance
   */
  createServer(app) {
    const config = app.config
    const configWeb = config.web
    const koa = app.config.web.koa

    // Create instance of Koa
    const server = koa()

    // Set Koa.keys for cookie secure encryption
    server.keys = configWeb.keys

    // Set onError handler, if required
    if (configWeb.onError) {
      server.context.onerror = require('koa-better-error-handler')
    }

    // Set compression handler, if required
    configWeb.middlewares.compress = require('koa-compress')(
      configWeb.compress
    )

    // Set cors handler, if required
    configWeb.middlewares.cors = require('kcors')(
      configWeb.cors
    )

    // Set session handler, if required
    configWeb.middlewares.session = require('koa-session')(
      configWeb.session,
      server
    )

    // Set bodyparser handler, if required
    configWeb.middlewares.bodyparser = require('koa-bodyparser')(
      configWeb.bodyparser.options
    )

    // Set static handler, if required
    if (config.main.paths && config.main.paths.www) {
      configWeb.middlewares.static = require('koa-mount')(
        configWeb.static.publicPath,
        require('koa-static')(
          config.main.paths.www,
          configWeb.static
        )
      )
    }
    else {
      app.log.warn('Path www is not defined, static won\'t be setup', config.main.paths)
    }

    // Set Error 404, if required
    configWeb.middlewares['404'] = require('koa-404-handler')

    return server
  },

  /**
   * Register all Koa's middlewares in order
   * @param {object} app    Trails.js App
   * @param {object} server Koa's instance
   */
  registerMiddlewares(app, server) {
    const config = app.config
    const configWeb = config.web
    const middlewares = configWeb.middlewares

    // Add middlewares using order
    for (const index in middlewares.order) {
      const middlewareName = middlewares.order[index]
      const middleware = middlewares[middlewareName]

      // Register routes
      if (middlewareName === 'router') {
        this.registerRoutes(app, server)
      }
      // Register middleware
      else if (middleware) {
        server.use(middleware)
      }
      // Ignore
      else {
        app.log.warn(`Middleware ${middlewareName} hasn't been found`)
        continue
      }
    }
  },

  /**
   * Register routes using Koa's Router
   * @param  {object} app    Trails.js App
   * @param  {object} server Koa's instance
   * @return {[type]}        [description]
   */
  registerRoutes(app, server) {
    // Reverse routes to have parametrized routes first
    const routes = app.routes.reverse()
    const KoaRouter = require('koa-router')

    const config = app.config
    const configWeb = config.web

    const router = configWeb.router = new KoaRouter()

    if (configWeb.ssl && configWeb.redirectToHttps) {
      router.all('*', (req, res, next) => {
        if (req.secure) {
          return next()
        }
        res.redirect('https://' + req.hostname + ':' + configWeb.port + req.url)
      })
    }

    routes.forEach(route => {
      if (route.method === '*') route.method = 'all'

      if (route.method instanceof Array) {
        route.method.forEach(method => {
          this.serverRoutes[method.toLowerCase() + ' ' + route.path] = route
        })
      }
      else {
        this.serverRoutes[route.method.toLowerCase() + ' ' + route.path] = route
      }
    })

    _.each(this.serverRoutes, (route, path) => {
      const parts = path.split(' ')

      let methods = []

      if (_.isPlainObject(route.handler)) {
        if (route.handler.directory && route.handler.directory.path) {
          router.use(parts[1], require('koa-static')(route.handler.directory.path))
        }
        else {
          app.log.warn(`${route.path} will be ignored, wrong handler configuration`)
        }
      }
      else {
        if (route.config) {
          if (route.config.validate && Object.keys(route.config.validate).length > 0) {

            // Add validation
            const validation = utils.createJoiValidationRules(route)

            methods = methods.concat((ctx, next) => {
              const req = ctx.req

              // Validate request
              // the request is sequentially validate the headers, params, query, and body
              joi.validate({
                headers: req.headers,
                params: req.params,
                query: req.query,
                body: req.body
              }, validation, (err, result) => {
                if (err) {
                  Boom.boomify(err, { 'statusCode': 400 })

                  throw err
                }
                else {
                  req.headers = result.headers
                  req.params = result.params
                  Object.defineProperty(req, 'query', { value: result.query })
                  req.body = result.body
                  next()
                }
              })
            })
          }
        }
        if (route.config.cors) {
          methods.push(cors(route.config.cors === true ? {} : route.config.cors))
        }

        if (route.config.pre && route.config.pre.length > 0) {
          methods = methods.concat(route.config.pre)
        }

        methods.push(route.handler)
        // Set route config as params to keep it on handlers
        methods.unshift(route.config)
        // Format route to koa protocol
        methods.unshift(route.path.replace(/{/g, ':').replace(/}/g, ''))

        router[parts[0]].apply(router, methods)
      }
    })

    server
      .use(router.routes())
      .use(router.allowedMethods({
        throw: true,
        notImplemented: () => new BoomNotImplemented(),
        methodNotAllowed: () => new BoomMethodNotAllowed()
      }))
  },

  /**
   * Start koa server
   * @param server koa server
   * @param app Trails application
   */
  start(app, server) {
    app.config.web.init(app, server)

    const configWeb = app.config.web

    return new Promise((resolve, reject) => {
      if (this.externalConfig) {
        this.externalConfig(app, server).then(servers => {
          this.nativeServer = servers
          resolve()
        }).catch(reject)
      }
      else {
        if (!configWeb.ssl) {
          // Generate a cert/keypair on the fly
          pem.createCertificate({
            days: 1,
            selfSigned: true,
          })
            .then(keys => {
              return this._createHTTPServer({
                key: keys.serviceKey,
                cert: keys.certificate,
              }, app, server)
            })
            .then(resolve)
            .catch(reject)
        }
        else {
          this._createHTTPServer(this.ssl, app, server)
            .then(resolve)
            .catch(reject)
        }
      }
    })
  },
  _createHTTPServer(credentials, app, server) {
    return new Promise((resolve, reject) => {
      const configWeb = app.config.web
      const configSocket = app.config.socket
      const socketIo = configSocket.socketIo

      credentials.spdy = configWeb.spdy

      const spdyServer = this.nativeServer = spdy.createServer(credentials, server.callback())
      app.io = socketIo.listen(spdyServer)

      app.io.on('connection', configSocket.onConnection)

      if (configSocket.cluster) {
        sticky(configSocket.cluster,
          spdyServer,
        ).listen(configWeb.port, configWeb.host, (err) => {
          if (err) {
            return reject(err)
          }

          const clusterWorkerId = cluster.worker ? cluster.worker.id : ''

          app.log.debug(
            `Cluster worker (${clusterWorkerId})` +
            ` HTTP server listening on ${configWeb.host}:${configWeb.host}`
          )

          resolve()
        })
      }
      else {
        spdyServer.listen(configWeb.port, configWeb.host, (err) => {
          if (err) {
            return reject(err)
          }

          app.log.debug(
            `HTTP server (no cluster) listening on ${configWeb.host}:${configWeb.host}`
          )

          resolve()
        })
      }
    })
  }
}
