/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:32:22
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-17 11:59:18
 */

'use strict'

const joi = require('joi')
const env = require('env-var')

module.exports = joi.object().keys({
  /**
   * Server name
   * @type {string}
   */
  server: joi.string(),
  /**
   * Koa package
   * @type {function}
   * @required
   */
  koa: joi.func()
    .required(),
  /**
   * Better customize Koa
   * @type {function}
   * @required
   */
  init: joi.func()
    .required(),
  /**
   * SSL options
   * Cert and key or pfx to create HTTPS server
   * @type {object}
   */
  ssl: joi.object().keys({
    /**
     * Private Key .key
     * @type {string}
     */
    key: joi.any(),
    /**
     * Certificate PEM .pem
     * @type {string}
     */
    cert: joi.any()
  }),
  /**
   * SPDY options
   * @type {object}
   */
  spdy: joi.object().keys({
    /**
     * list of NPN/ALPN protocols to use
     * @type {array}
     * @default ['h2','spdy/3.1','spdy/3','spdy/2','http/1.1','http/1.0']
     */
    protocols: joi.array()
      .items(
        joi.string()
      ),
    /**
     * If defined, server will ignore NPN and ALPN data and choose whether to use spdy or plain http by looking at first data packet.
     * @type {boolean}
     */
    plain: joi.boolean(),
    /**
     * Parse first incoming X_FORWARDED_FOR frame and put it to the
     * headers of every request.
     * NOTE: Use with care! This should not be used without some proxy that
     * will *always* send X_FORWARDED_FOR
     */
    'x-forwarded-for': joi.boolean(),
    /**
     * SPDY Connection options
     * @type {object}
     */
    connection: joi.object().keys({
      /**
       * Server's window siz
       * @type {number}
       */
      windowSize: joi.number()
        .integer(),
      /**
       * If true - server will send 3.1 frames on 3.0 *plain* spdy
       * @type {boolean}
       */
      autoSpdy31: joi.boolean()
    })
  }),
  /**
   * The port to bind the web server to
   * @type number
   * @default 3000
   */
  port: joi.number()
    .integer()
    .default(env.get('PORT', 3000).asIntPositive()),
  /**
   * The host to bind the web server to
   * @type string
   * @default localhost
   */
  host: joi.string()
    .default(env.get('HOST', 'localhost').asString()),

  /**
   * Feature for koa.context.onerror handler
   * @type {boolean|function}
   * @default true
   */
  onError: joi.alternatives()
    .try(
      joi.boolean(),
      joi.func()
    )
    .default(true),
  /**
   * Feature koa-compress
   * https://www.npmjs.com/package/koa-compress
   * @type {boolean|object}
   * @default true
   */
  compress: joi.alternatives()
    .try(
      joi.boolean(),
      joi.object().keys({
        filter: joi.func(),
        threshold: joi.string()
          .default('1kb')
      })
        .optionalKeys('filter', 'threshold')
    )
    .default(true),
  /**
   * Feature koa-cors
   * https://www.npmjs.com/package/@koa/cors
   * @type {boolean|object}
   * @default true
   */
  cors: joi.alternatives()
    .try(
      joi.boolean(),
      joi.object().keys({
        origin: joi.alternatives()
          .try(
            joi.string(),
            joi.func()
          ),
        allowMethods: joi.alternatives()
          .try(
            joi.string(),
            joi.array()
              .items(joi.string())
          ),
        exposeHeaders: joi.alternatives()
          .try(
            joi.string(),
            joi.array()
              .items(joi.string())
          ),
        allowHeaders: joi.alternatives()
          .try(
            joi.string(),
            joi.array()
              .items(joi.string())
          ),
        maxAge: joi.alternatives()
          .try(
            joi.string(),
            joi.number()
              .integer()
              .min(0)
          ),
        credentials: joi.boolean(),
        keepHeadersOnError: joi.boolean()
      })
        .optionalKeys(
          'origin',
          'allowMethods',
          'exposeHeaders',
          'allowHeaders',
          'maxAge',
          'credentials',
          'keepHeadersOnError'
        )
    )
    .default(true),
  /**
   * Feature koa-session
   * https://www.npmjs.com/package/koa-cors
   * @type {boolean|object}
   */
  session: joi.alternatives()
    .try(
      joi.boolean(),
      joi.object().keys({
        key: joi.string(),
        maxAge: joi.number()
          .integer(),
        overwrite: joi.boolean(),
        httpOnly: joi.boolean(),
        signed: joi.boolean(),
        rolling: joi.boolean(),
        renew: joi.boolean()
      })
        .optionalKeys(
          'key',
          'maxAge',
          'overwrite',
          'httpOnly',
          'signed',
          'rolling',
          'renew'
        )
    )
    .default(true),
  /**
   * Feature koa-bodyparser
   * https://www.npmjs.com/package/koa-bodyparser
   * @type {object}
   */
  bodyparser: joi.alternatives()
    .try(
      joi.boolean(),
      joi.object().keys({
        enableTypes: joi.array()
          .items(
            joi.string()
          ),
        encode: joi.string(),
        formLimit: joi.string(),
        jsonLimit: joi.string(),
        textLimit: joi.string(),
        strict: joi.boolean(),
        detectJSON: joi.func(),
        extendTypes: joi.object().keys({
          json: joi.array()
            .items(
              joi.string()
            ),
          text: joi.array()
            .items(
              joi.string()
            ),
          form: joi.array()
            .items(
              joi.string()
            ),
        }),
        onerror: joi.func(),
      })
        .optionalKeys(
          'enableTypes',
          'encode',
          'formLimit',
          'jsonLimit',
          'textLimit',
          'strict',
          'detectJSON',
          'extendTypes',
          'extendTypes.json',
          'extendTypes.text',
          'extendTypes.form'
        )
    )
    .default(true),
  /**
   * Feature default koa-static options
   * https://www.npmjs.com/package/koa-static
   * @type {object}
   */
  serve: joi.object().keys({
    maxage: joi.number()
      .integer(),
    hidden: joi.boolean(),
    index: joi.string(),
    defer: joi.boolean(),
    gzip: joi.boolean(),
    setHeaders: joi.func(),
    extensions: joi.boolean()
  })
    .optionalKeys(
      'maxage',
      'hidden',
      'index',
      'defer',
      'gzip',
      'setHeaders',
      'extensions'
    )
    .default({}),

  /**
   * Middlewares
   * @type {object}
   */
  middlewares: joi.object()
    // Keys must all contain functions
    .pattern(/^.*$/, joi.func())
    .default({}),
  /**
   * Middlewares Order
   * @type {object}
   */
  middlewaresOrder: joi.array()
    .items(joi.string())
    .default([
      'compress',
      'cors',
      'session',
      'bodyparser',
      'router',
      '404'
    ])
})
