/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:29:11
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-11 11:36:25
 */

'use strict'

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

module.exports = {
  /**
   * Validate `config.main` using `schemas.config.main`
   * @param  {object}  config Trails.JS config
   * @return {Promise}        Promise
   */
  validateConfigMain (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, schemas.config.main, (err, value) => {
        if (err) return reject(new TypeError('config.main: ' + err))

        return resolve(value)
      })
    })
  },
  /**
   * Validate `config.web` using `schemas.config.web`
   * @param  {object}  config Trails.JS config
   * @return {Promise}        Promise
   */
  validateConfigWeb (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, schemas.config.web, (err, value) => {
        if (err) return reject(new TypeError('config.web: ' + err))

        return resolve(value)
      })
    })
  },
  /**
   * Validate `config.socket` using `schemas.config.socket`
   * @param  {object}  config Trails.JS config
   * @return {Promise}        Promise
   */
  validateConfigSocket (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, schemas.config.socket, (err, value) => {
        if (err) return reject(new TypeError('config.socket: ' + err))

        return resolve(value)
      })
    })
  }
}
