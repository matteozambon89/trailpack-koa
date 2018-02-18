/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:32:22
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-13 01:15:53
 */

'use strict'

const joi = require('joi')
const path = require('path')

module.exports = joi.object().keys({
  /**
   * Paths
   * @type {object}
   */
  paths: joi.object().keys({
    /**
     * Static Web path
     * @type {string}
     * @default /www
     */
    www: joi.string()
      .default(path.resolve(__dirname, 'www'))
  }).unknown(true)
}).unknown(true)
