/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-15 10:15:07
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-17 11:47:38
 */

'use strict'

/**
 * https://www.npmjs.com/package/lodash
 * @type {object}
 */
const _ = require('lodash')

/**
 * https://www.npmjs.com/package/joi
 * @type {object}
 */
const joi = require('joi')

/**
 * Internal JOI Schemas
 * @type {object}
 */
const schemas = require('./schemas')

/**
 * Internal Lib
 * @type {object}
 */
const lib = require('./')

module.exports = {
  /**
   * Validate data against internal joi schema
   * @param  {object}  app  TrailsJs App
   * @param  {string}  path JSON Path
   * @return {Promise}
   */
  validateSchema (data, schema) {
    return new Promise((resolve, reject) => {
      // Validate data using schema via Joi
      joi.validate(data, schema, (err, result) => {
        // Custom error
        if (err) return lib.Error.invalidSchema(err, reject)

        resolve(result)
      })
    })
  },
  /**
   * Ensure no trailpack server is setup
   * @param  {object} app TrailsJs App
   * @return {Promise}
   */
  validateConflictPack (app) {
    // Trailpack competing server check
    if (_.includes(_.keys(app.config.main.packs), 'hapi', 'express', 'koa2', 'restify')) {
      return lib.Error.conflictPack(app)
    }

    return Promise.resolve()
  },
  /**
   * Ensure koa module is setup on app.config.web.koa
   * @param  {object} app TrailsJs App
   * @return {Promise}
   */
  validateMissingKoa (app) {
    if (!app.config.web.koa) {
      return lib.Error.missingKoa(app)
    }

    return Promise.resolve()
  },
  /**
   * Validate app.config.main againt trailpack schema
   * @param  {object}  app  TrailsJs App
   * @return {Promise}
   */
  validateConfigMain (app) {
    return this.validateSchema(app.config.main, schemas.config.main)
  },
  /**
   * Validate app.config.web againt trailpack schema
   * @param  {object}  app  TrailsJs App
   * @return {Promise}
   */
  validateConfigWeb (app) {
    return this.validateSchema(app.config.web, schemas.config.web)
  },
  /**
   * Validate app.config.socket againt trailpack schema
   * @param  {object}  app  TrailsJs App
   * @return {Promise}
   */
  validateConfigSocket (app) {
    return this.validateSchema(app.config.socket, schemas.config.socket)
  },

  validateSyncRouteConfigCors (cors) {
    return joi.validate(cors, schemas.route.config.cors)
  },
  validateSyncRouteHandlerServe (handler) {
    return joi.validate(handler, schemas.route.handler.serve)
  },
  validateSyncRouteHandlerRedirect (handler) {
    return joi.validate(handler, schemas.route.handler.redirect)
  }
}
