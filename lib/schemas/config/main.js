/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:32:22
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-11 02:29:54
 */

'use strict'

const joi = require('joi')

module.exports = joi.object().keys({
  /**
   * Paths
   * @type {object}
   */
  'paths': joi.object().keys({
    /**
     * Static Web path
     * @type {string}
     */
    'www': joi.string()
  })
})
