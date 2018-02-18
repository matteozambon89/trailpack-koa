/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-15 09:55:24
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-18 04:43:44
 */

'use strict'

/**
 * Node HTTP module
 * @type {object}
 */
const http = require('http')

/**
 * Node HTTPS module
 * @type {object}
 */
const https = require('https')

/**
 * https://www.npmjs.com/package/spdy
 * @type {object}
 */
const spdy = require('spdy')

/**
 * Node Cluster module
 * @type {object}
 */
const cluster = require('cluster')

/**
 * https://www.npmjs.com/package/lodash
 * @type {object}
 */
const _ = require('lodash')

/**
 * https://www.npmjs.com/package/socketio-sticky-session
 * @type {function}
 */
const socketIoStickySession = require('socketio-sticky-session')

/**
 * https://www.npmjs.com/package/koa-router
 * @type {function}
 */
const KoaRouter = require('koa-router')

/**
 * https://www.npmjs.com/package/boom
 * @type {object}
 */
const Boom = require('boom')

/**
 * Internal Lib
 * @type {object}
 */
const lib = require('./')

const SERVER_TYPE_HTTP = 'http'
const SERVER_TYPE_HTTPS = 'https'
const SERVER_TYPE_SPDY = 'spdy'
const SOCKET_TYPE_SOCKETIO = 'socket-io'

module.exports = {
  /**
   * Create a new Koa instance
   * and set keys
   * @param  {object} app TrailsJs App
   * @return {object}     Koa Server instance
   */
  create (app) {
    const Koa = app.config.web.koa

    // Create instance of Koa
    const koa = new Koa()

    // Set Koa.keys for cookie secure encryption
    koa.keys = app.config.web.keys

    return koa
  },

  /**
   * Start Koa, Native Web Server and Socket
   * @param  {object}  app TrailsJs App
   * @param  {object}  koa Koa App
   * @return {Promise}
   */
  start (app, koa) {
    // Allow devs to customize Koa App on their end too
    app.config.web.init(app, koa)

    return this._createWebServer(app, koa)
  },
  /**
   * Register embedded Koa features based on config.web
   * @param  {object}  app TrailsJs App
   * @param  {object}  koa Koa App
   * @return {Promise}
   */
  registerFeatures (app, koa) {
    // Set onError handler, if function is specified
    if (typeof app.config.web.onError === 'function') {
      koa.context.onerror = app.config.web.onError
    }
    // Set koa-better-error-handler, if required
    else if (app.config.web.onError) {
      koa.context.onerror = require('koa-better-error-handler')
    }

    // Set compression handler, if required and not yet setup
    if (app.config.web.compress && !app.config.web.middlewares.compress) {
      app.config.web.middlewares.compress = require('koa-compress')(
        typeof app.config.web.compress === 'object' ?
          app.config.web.compress : {}
      )
    }

    // Set cors handler, if required and not yet setup
    if (app.config.web.cors && !app.config.web.middlewares.cors) {
      app.config.web.middlewares.cors = require('@koa/cors')(
        typeof app.config.web.cors === 'object' ?
          app.config.web.cors : {}
      )
    }

    // Set session handler, if required and not yet setup
    if (app.config.web.session && !app.config.web.middlewares.session) {
      app.config.web.middlewares.session = require('koa-session')(
        typeof app.config.web.session === 'object' ?
          app.config.web.session : {},
        koa
      )
    }

    // Set bodyparser handler, if required and not yet setup
    if (app.config.web.bodyparser && !app.config.web.middlewares.bodyparser) {
      app.config.web.middlewares.bodyparser = require('koa-bodyparser')(
        typeof app.config.web.bodyparser === 'object' ?
          app.config.web.bodyparser : {}
      )
    }

    // Set respond handler, if required and not yet setup
    if (app.config.web.respond && !app.config.web.middlewares.respond) {
      app.config.web.middlewares.respond = require('koa-respond')(
        typeof app.config.web.respond === 'object' ?
          app.config.web.respond : {}
      )
    }

    // Default Error 404 in case isn't set
    if (!app.config.web.middlewares['404']) {
      app.config.web.middlewares['404'] = require('koa-404-handler')
    }

    return Promise.resolve()
  },
  /**
   * Register Koa middlewares in order
   * @param  {object} app TrailsJS App
   * @param  {object} koa Koa App
   * @return {Promise}
   */
  registerMiddlewares(app, koa) {
    const order = app.config.web.middlewaresOrder
    const middlewares = app.config.web.middlewares

    const routers = []

    // Add middlewares using order
    _.each(order, middlewareName => {
      const middleware = middlewares[middlewareName]

      // Register routes
      if (middlewareName === 'router') {
        routers.push(this._registerRoutes(app, koa))
      }
      // Register middleware
      else if (middleware) {
        koa.use(middleware)
      }
      // Ignore
      else {
        const message = lib.Utils.message('warn-missing-middleware', middlewareName)
        app.logger.warn(message)
      }
    })

    return Promise.resolve({
      routers: routers
    })
  },

  /**
   * Create Web Server (HTTP, HTTPS or SPDY) and Socket Server given a Kao App
   * @private
   * @param   {object}  app TrailsJs App
   * @param   {object}  koa Koa App
   * @return  {Promise}
   */
  _createWebServer(app, koa) {
    return new Promise((resolve, reject) => {
      let nativeServer
      let serverType

      let socket
      let socketType

      if (app.config.web.spdy && app.config.web.ssl) {
        const spdyParams = _.merge(
          app.config.web.spdy,
          app.config.web.ssl
        )

        nativeServer = this._createSpdyServer(spdyParams, koa)
        serverType = SERVER_TYPE_SPDY
      }
      else if (app.config.web.https && app.config.web.ssl) {
        const httpsParams = _.merge(
          app.config.web.https,
          app.config.web.ssl
        )

        nativeServer = this._createHttpsServer(httpsParams, koa)
        serverType = SERVER_TYPE_HTTPS
      }
      else {
        if (app.config.web.ssl) {
          const message = lib.Utils.message('warn-required-server')
          app.logger.warn(message)
        }

        nativeServer = this._createHttpServer(koa)
        serverType = SERVER_TYPE_HTTP
      }

      // Create Socket Server given a Web Server
      if (app.config.socket) {
        if (app.config.socket.socketIo) {
          socket = this._createSocketIo(app, nativeServer)
          socketType = SOCKET_TYPE_SOCKETIO
        }
        else {
          return lib.Error.unhandledSocketType(app, reject)
        }

        const message = lib.Utils.message(`notify-started-${socketType}`)
        app.logger.debug(message)
      }

      if (socket && app.config.socket.cluster) {
        const options = typeof app.config.socket.cluster === 'object' ?
          app.config.socket.cluster : {}

        if (socketType === SOCKET_TYPE_SOCKETIO) {
          // Handle Sticky Session for SocketIo
          socketIoStickySession(options, nativeServer)
            // Listen to port and host
            .listen(app.config.web.port, app.config.web.host, (err) => {
              if (err) {
                return lib.Error.failedStartServer(err, app, reject)
              }

              const clusterWorkerId = cluster.worker ? cluster.worker.id : ''

              const message = lib.Utils.message(`notify-started-cluster-${serverType}`, {
                host: app.config.web.host,
                port: app.config.web.port,
                clusterWorkerId: clusterWorkerId
              })
              app.logger.debug(message)

              // Pass Web Server and Web Socket Server
              resolve({
                nativeServer: nativeServer,
                socket: socket,
                clusterWorkerId: clusterWorkerId
              })
            })
        }
        else {
          return lib.Error.unhandledClusterSocketType(app, reject)
        }
      }
      else {
        // Listen to port and host
        nativeServer.listen(app.config.web.port, app.config.web.host, (err) => {
          if (err) {
            return lib.Error.failedStartServer(err, app, reject)
          }

          const message = lib.Utils.message(`notify-started-server-${serverType}`, {
            host: app.config.web.host,
            port: app.config.web.port
          })
          app.logger.debug(message)

          // Pass Web Server and Web Socket Server
          resolve({
            nativeServer: nativeServer,
            socket: socket
          })
        })
      }
    })
  },
  /**
   * Create SPDY Web Server given a Kao App
   * @private
   * @param   {object}  params SPDY parameters
   * @param   {object}  koa    Koa App
   * @return  {Promise}
   */
  _createSpdyServer(params, koa) {
    return spdy.createServer(params, koa.callback())
  },
  /**
   * Create HTTPS Web Server given a Kao App
   * @private
   * @param   {object}  params HTTPS parameters
   * @param   {object}  koa    Koa App
   * @return  {Promise}
   */
  _createHttpsServer(params, koa) {
    return https.createServer(params, koa.callback())
  },
  /**
   * Create HTTP Web Server given a Kao App
   * @private
   * @param   {object}  koa    Koa App
   * @return  {Promise}
   */
  _createHttpServer(koa) {
    return http.createServer(koa.callback())
  },
  /**
   * Create socket.io server for a Web Server
   * @private
   * @param   {object}  app          TrailsJs App
   * @param   {object}  nativeServer Native Server
   * @return  {Promise}
   */
  _createSocketIo(app, nativeServer) {
    const socketIo = app.config.socket.socketIo(nativeServer, app.config.socket.params)

    app.config.socket.init(app, socketIo)

    return socketIo
  },

  /**
   * Register routes using Koa's Router
   * @param  {object}  app TrailsJs App
   * @param  {object}  koa Koa App
   */
  _registerRoutes(app, koa) {
    // Reverse routes to have parametrized routes first
    const routes = app.routes.reverse()

    const router = new KoaRouter()

    // TODO: allow HTTP, HTTPS and SPDY at the same time
    // TODO: allow redirect from HTTP to HTTPS
    // if (app.config.web.redirectToHttps) {
    //   router.all('*', (ctx, next) => {
    //     const req = ctx.request
    //
    //     if (req.secure) {
    //       return next()
    //     }
    //
    //     ctx.redirect('https://' + req.hostname + ':' + app.config.web.port + req.url)
    //   })
    // }

    routes.forEach(route => {
      let methods

      // No method means all to me
      if (_.isEmpty(route.method)) {
        methods = ['all']
      }
      // Array of methods must have unique methods
      else if (_.isArray(route.method)) {
        methods = _.uniq(route.method)

        // Remove any other method if *, ALL or all are encountered
        if (_.includes(methods, '*') || _.includes(methods, 'ALL') || _.includes(methods, 'all')) {
          methods = ['all']
        }
      }
      // Single method will be converted to Array to have
      else if (_.isString(route.method)) {
        methods = [route.method === '*' ? 'all' : route.method]
      }
      else {
        const message = lib.Utils.message('warn-malformed-route-method', route.path)
        app.logger.warn(message)

        return
      }

      // Generate list of middlewares to run with method/path combination
      const middlewares = this._generateKoaRoute(app, koa, router, route)

      // Silently move to next since _generateKoaRoute
      // can easily notify of the issue/changes to standard flow
      if (!middlewares) {
        return
      }

      // Apply the same middlewares to all the methods within a path
      // N.B. route.path is actually at the beginning of the middlewares array
      _.each(methods, method => {
        method = method.toLowerCase()

        router[method].apply(router, middlewares)
      })
    })

    // Finalize
    koa
      .use(router.routes())
      .use(router.allowedMethods({
        throw: true,
        notImplemented: () => Boom.notImplemented(),
        methodNotAllowed: () => Boom.methodNotAllowed()
      }))
  },
  _generateKoaRoute (app, koa, router, route) {
    // Make sure url params are defined as:
    // :x
    // instead of
    // {x}
    // e.i. /hello/{name} => /hello/:name
    const path = route.path.replace(/\{/g, ':').replace(/\}/g, '')

    // List of middlewares for this route
    let middlewares = []

    // Enable CORS
    if (route.config.cors) {
      // TODO: handle this
      const result = lib.Validator.validateSyncRouteConfigCors(route.config.cors)

      if (result.error) {
        const message = lib.Utils.message('warn-malformed-route-cors', route.path)
        app.logger.warn(message)
        app.logger.verbose('warn-malformed-route-cors', route, result)
      }
      else {
        middlewares.push(require('cors')(route.config.cors === true ? {} : route.config.cors))
      }
    }

    // Enable Policies
    if (!_.isEmpty(route.config.pre)) {
      middlewares = middlewares.concat(route.config.pre)
    }

    // Handler as object allows customizable handlers
    // different from TrailsJs Controllers
    if (_.isPlainObject(route.handler)) {
      // Serve Static Content
      if (route.handler.serve) {
        // TODO: handle this
        const result = lib.Validator.validateSyncRouteHandlerServe(route.handler)

        if (result.error) {
          const message = lib.Utils.message('warn-malformed-route-serve', route.path)
          app.logger.warn(message)
          app.logger.verbose('warn-malformed-route-serve', route, result)
        }
        else {
          middlewares.push(require('koa-static')(
            route.handler.directory,
            _.merge(
              app.config.web.serve || {},
              route.handler.options
            )
          ))
        }
      }
      // Redirect from path to another path
      // N.B. redirect doesn't have features
      else if (route.handler.redirect) {
        // TODO: handle this
        const result = lib.Validator.validateSyncRouteHandlerRedirect(route.handler)

        if (result.error) {
          const message = lib.Utils.message('warn-malformed-route-redirect', route.path)
          app.logger.warn(message)
          app.logger.verbose('warn-malformed-route-redirect', route, result)
        }
        else {
          router.redirect(
            route.handler.from || path,
            route.handler.to,
            route.handler.code
          )
        }

        return
      }
      // Give developer the possibility to extend the router as they wish
      else if (route.handler.extend) {
        const customMiddlewares = route.handler.extend(app, koa, router, route)

        // Developer should handle notifications
        if (!customMiddlewares) {
          return
        }

        middlewares = middlewares.concat(customMiddlewares)
      }
    }
    else if (_.isFunction(route.handler)) {
      middlewares.push(route.handler)
    }
    else {
      const message = lib.Utils.message('warn-malformed-route-handler', route.path)
      app.logger.warn(message)
      app.logger.verbose('warn-malformed-route-handler', route)

      return
    }

    middlewares.unshift(path)

    return middlewares
  }
}
