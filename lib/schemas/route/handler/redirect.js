/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-17 11:26:33
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-17 11:36:54
 */

'use strict'

const joi = require('joi')

module.exports = joi.object().keys({
  redirect: joi.boolean()
    .valid(true)
    .required(),
  from: joi.string(),
  to: joi.string()
    .required(),
  code: joi.number()
    .valid([301, 302, 303])
    .default(301)
})
  .optionalKeys(
    'from',
    'code'
  )
