/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:17:42
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-17 09:02:54
 */

'use strict'

/**
 * https://www.npmjs.com/package/trailpack
 * @type {class}
 */
const ServerTrailpack = require('trailpack/server')

/**
 * Internal Lib
 * @type {object}
 */
const lib = require('./lib')

module.exports = class KoaTrailpack extends ServerTrailpack {

  /**
   * Ensure that config/web is valid, and that no other competing web
   * server trailpacks are installed (e.g. express), also ensure
   * dependencies are met
   * @return {Promise}
   */
  validate() {
    // Done
    return Promise.all([
      lib.Validator.validateConflictPack(this.app),
      lib.Validator.validateMissingKoa(this.app),
      lib.Validator.validateConfigMain(this.app),
      lib.Validator.validateConfigWeb(this.app),
      lib.Validator.validateConfigSocket(this.app),
    ])
  }

  /**
   * Setup configurations
   * @return {Promise}
   */
  configure() {
    return Promise.all([
      () => {
        this.app.config.set('web.server', 'koa')

        return Promise.resolve()
      },
      // Utilize JOI validator to set the formatted config
      lib.Validator.validateConfigMain(this.app),
      // Utilize JOI validator to set the formatted config
      lib.Validator.validateConfigWeb(this.app),
      // Utilize JOI validator to set the formatted config
      lib.Validator.validateConfigSocket(this.app)
    ])
      .then((result) => {
        this.app.config.set('main', result[1])
        this.app.config.set('web', result[2])
        this.app.config.set('socket', result[3])
      })
  }

  /**
   * Start Web Server
   * @return {Promise}
   */
  initialize() {
    this.server = lib.Server.create(this.app)

    return lib.Server.registerFeatures(this.app, this.server)
      .then(() => {
        return lib.Server.registerMiddlewares(this.app, this.server)
      })
      .then((result) => {
        this.serverRouter = result.router

        return lib.Server.start(this.app, this.server)
      })
      .then((result) => {
        this.nativeServer = result.nativeServer
        this.socket = result.socket

        this.app.emit('webserver:http:ready', lib.Server.nativeServer)
      })
  }

  /**
   * Stop Web Server
   */
  unload() {
    this.nativeServer.close()
  }

  /**
   * Trailpack Constructor
   * @param {object} app TrailsJs App
   */
  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
