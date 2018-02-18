/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-17 11:26:33
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-17 11:29:25
 */

'use strict'

const joi = require('joi')

module.exports = joi.alternatives().try(
  joi.boolean(),
  joi.object().keys({
    origin: joi.array(),
    maxAge: joi.number(),
    headers: joi.array(),
    additionalHeaders: joi.array(),
    exposedHeaders: joi.array(),
    additionalExposedHeaders: joi.array(),
    credentials: joi.boolean()
  })
)
