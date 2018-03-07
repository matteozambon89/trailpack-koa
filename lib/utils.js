/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-15 10:33:42
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-07 08:08:32
 */

'use strict'

/**
 * https://www.npmjs.com/package/string-template
 * @type {object}
 */
const format = require('string-template')

/**
 * https://www.npmjs.com/package/lodash
 * @type {object}
 */
const _ = require('lodash')

/**
 * Internal Strings
 * @type {object}
 */
const strings = require('./strings')

module.exports = {
  message (key, params) {
    return format(strings[key], params)
  },
  oneOfPacks (app, dependentPacks) {
    const packsNames = this.getPacksNames(app)

    return _.some(packsNames, r => _.includes(dependentPacks, r))
  }
}
