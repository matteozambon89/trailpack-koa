/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-17 11:26:33
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-17 11:38:13
 */

'use strict'

const joi = require('joi')

module.exports = joi.object().keys({
  serve: joi.boolean()
    .valid(true)
    .required(),
  directory: joi.string()
    .required(),
  options: joi.object()
    .default({})
})
