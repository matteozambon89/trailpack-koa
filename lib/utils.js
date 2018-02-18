/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-15 10:33:42
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-16 01:21:27
 */

'use strict'

/**
 * https://www.npmjs.com/package/string-template
 * @type {object}
 */
const format = require('string-template')

/**
 * Internal Strings
 * @type {object}
 */
const strings = require('./strings')

module.exports = {
  message (key, params) {
    return format(strings[key], params)
  }
}
