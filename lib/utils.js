/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 07:45:50
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-11 07:48:34
 */

'use strict'

const joi = require('joi')

module.exports = {
  /**
   * Return an hapi like validation middleware for koa
   * @param trails route configuration
   * @returns  joi validation Rules
   */
  createJoiValidationRules: function(route) {
    route.config.validate.body = route.config.validate.payload // hapi compatibility
    const validation = route.config.validate
    const types = ['headers', 'params', 'query', 'body']
    types.forEach((type) => {
      let rule = validation[type]

      // null, undefined, true - anything allowed
      // false - nothing allowed
      // {...} - ... allowed
      rule = (rule === false ? joi.object({}).allow(null) :
        typeof rule === 'function' ? rule :
          !rule || rule === true ? joi.any() :
            joi.compile(rule))
      validation[type] = rule
    })
    return validation
  }
}
