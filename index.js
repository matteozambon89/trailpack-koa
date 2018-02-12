/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:17:42
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-11 11:39:35
 */

'use strict'

const lib = require('./lib')
const _ = require('lodash')
const ServerTrailpack = require('trailpack/server')

module.exports = class Koa extends ServerTrailpack {

  /**
   * Ensure that config/web is valid, and that no other competing web
   * server trailpacks are installed (e.g. koa)
   */
  validate() {
    if (_.includes(_.keys(this.app.config.main.packs), 'hapi', 'express', 'koa2', 'restify')) {
      return Promise.reject(
        new Error('There is another web services trailpack installed that conflicts with trailpack-koa!')
      )
    }
    if (!this.app.config.web.koa) {
      return Promise.reject(
        new Error('config.web.koa is absent, please npm install your koa and uncomment the line under config.web.koa')
      )
    }
    return Promise.all([
      lib.Validator.validateConfigMain(this.app.config.main),
      lib.Validator.validateWebConfig(this.app.config.web),
      lib.Validator.validateSocketConfig(this.app.config.socket)
    ])
  }

  configure() {
    this.app.config.web.server = 'koa'
  }

  /**
   * Start Express Server
   */
  initialize() {
    this.server = lib.Server.createServer(this.app)

    return Promise.all([
      lib.Server.registerMiddlewares(this.app, this.server)
    ])
      .then(() => {
        return lib.Server.start(this.app, this.server)
      })
      .then(() => {
        this.app.emit('webserver:http:ready', lib.Server.nativeServer)
      })
  }

  unload() {
    if (lib.Server.nativeServer === null) {
      return
    }
    else if (_.isArray(lib.Server.nativeServer)) {
      lib.Server.nativeServer.forEach(server => {
        server.close()
      })
    }
    else {
      lib.Server.nativeServer.close()
    }

  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
