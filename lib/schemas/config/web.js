/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:32:22
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-12 01:07:29
 */

'use strict'

const joi = require('joi')

module.exports = joi.object().keys({
  /**
   * Server name
   * @type {string}
   */
  'server': joi.string(),
  /**
   * Koa package
   * @type {function}
   * @required
   */
  'koa': joi.func()
    .required(),
  /**
   * Better customize Koa
   * @type {function}
   */
  'init': joi.func()
    .arity(2),
  /**
   * Config server
   * @type {function}
   */
  'externalConfig': joi.func()
    .arity(2),
  /**
   * Signed cookie keys
   * @type {array}
   */
  'keys': joi.array()
    .min(1)
    .required()
    .default(['im a newer secret', 'i like turtle'], 'Signed cookie keys'),
  /**
   * Enable/Disable onError handler
   * @type {boolean}
   * @default true
   */
  'onError': joi.boolean()
    .default(true, 'Enable/Disable onError handler'),
  /**
   * Compress options (https://github.com/koajs/compress)
   * @type {object}
   */
  'compress': joi.object(),
  /**
   * CORS options (https://github.com/koajs/cors)
   * @type {object}
   */
  'cors': joi.object().keys({
    'origin': joi.alternatives()
      .try(
        joi.string(),
        joi.func()
          .arity(1)
      )
      .default('*'),
    'allowMethods': joi.alternatives()
      .try(
        joi.string(),
        joi.array()
      )
      .default('GET,HEAD,PUT,POST,DELETE,PATCH'),
    'exposeHeaders': joi.alternatives()
      .try(
        joi.string(),
        joi.array()
      ),
    'allowHeaders': joi.alternatives()
      .try(
        joi.string(),
        joi.array()
      ),
    'maxAge': joi.alternatives()
      .try(
        joi.string(),
        joi.number()
      ),
    'credentials': joi.boolean(),
    'keepHeadersOnError': joi.boolean(),
  }),
  /**
   * Koa session
   * @type {object}
   */
  'session': joi.object().keys({
    /**
     * Session key
     * @type {string}
     * @default koa:sess
     */
    'key': joi.string()
      .default('koa:sess', 'Session key (default koa:sess)'),
    /**
     * Session max age
     * @type {number|string}
     * @default 86400000
     */
    'maxAge': joi.alternatives()
      .try(
        joi.number()
          .integer(),
        joi.string()
          .valid('session')
      )
      .default(24 * 60 * 60 * 1000, 'Session max age (default 1 day)'),
    /**
     * Can overwrite or not
     * @type {boolean}
     * @default true
     */
    'overwrite': joi.boolean()
      .default(true, 'Can overwrite or not (default true)'),
    /**
     * Only for HTTP or not
     * @type {boolean}
     * @default true
     */
    'httpOnly': joi.boolean()
      .default(true, 'Only for HTTP or not (default true)'),
    /**
     * Signed or not
     * @type {boolean}
     * @default true
     */
    'signed': joi.boolean()
      .default(true, 'Signed or not (default true)'),
    /**
     * Force a session identifier cookie to be set on every response.
     * The expiration is reset to the original maxAge, resetting the expiration countdown.
     * @type {boolean}
     * @default false
     */
    'rolling': joi.boolean()
      .default(false, 'Force a session identifier cookie to be set on every response.' +
      ' The expiration is reset to the original maxAge, resetting the expiration countdown.' +
      ' (default false) '),
    /**
     * Renew session when session is nearly expired, so we can always keep user logged in.
     * @type {boolean}
     * @default false
     */
    'renew': joi.boolean()
      .default(false, 'Renew session when session is nearly expired,' +
      ' so we can always keep user logged in. (default false)'),
  }),
  /**
   * Body parser options (https://github.com/koajs/bodyparser)
   * @type {object}
   */
  'bodyparser': joi.object().keys({
    /**
     * Parser will only parse when request type hits enableTypes.
     * @type {array}
     * @default ['json','form']
     */
    'enableTypes': joi.array()
      .items(
        joi.string()
      )
      .default(['json', 'form'], 'Parser will only parse when request type hits enableTypes' +
      ' (default [\'json\', \'form\'])'),
    /**
     * Requested encoding
     * @type {string}
     * @default utf-8
     */
    'encode': joi.stirng()
      .default('utf-8', 'Requested encoding (default utf-8)'),
    /**
     * Limit of the urlencoded body.
     * If the body ends up being larger than this limit, a 413 error code is returned.
     * @type {string}
     * @default 56kb
     */
    'formLimit': joi.stirng()
      .default('56kb', 'Limit of the urlencoded body.' +
      ' If the body ends up being larger than this limit,' +
      ' a 413 error code is returned (default 56kb)'),
    /**
     * Limit of the json body
     * @type {string}
     * @default 1mb
     */
    'jsonLimit': joi.stirng()
      .default('1mb', 'Limit of the json body (default 1mb)'),
    /**
    * Limit of the text body
    * @type {string}
    * @default 1mb
     */
    'textLimit': joi.stirng()
      .default('1mb', 'Limit of the text body (default 1mb)'),
    /**
     * When set to true, JSON parser will only accept arrays and objects
     * @type {boolean}
     * @default true
     */
    'strict': joi.boolean()
      .default(true, 'JSON parser only accept arrays and objects (default true)'),
    /**
     * Custom json request detect function
     * @type {function}
     * @default null
     */
    'detectJSON': joi.func()
      .arity(1)
      .allow(null)
      .default(null, 'Custom json request detect function (default null)'),
    /**
     * Support extend types:
     * {
     *   json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
     * }
     * @type {object}
     */
    'extendTypes': joi.object().keys({
      'json': joi.array()
        .items('string'),
      'text': joi.array()
        .items('string'),
      'form': joi.array()
        .items('string'),
    }),
    /**
     * Support custom error handle, if koa-bodyparser throw an error, you can customize the response
     * @type {string}
     */
    'onerror': joi.func()
      .arity(2),
  }),
  /**
   * Static options (https://github.com/koajs/static)
   * @type {object}
   */
  'static': joi.object().keys({
    /**
     * Path exposed to public
     * @type {string}
     * @required
     */
    'publicPath': joi.string()
      .required(),
    /**
     * Browser cache max-age in milliseconds
     * @type {number}
     * @default 0
     */
    'maxage': joi.number()
      .integer()
      .default(0, 'Browser cache max-age in milliseconds (default 0)'),
    /**
     * Allow transfer of hidden files
     * @type {boolean}
     * @default false
     */
    'hidden': joi.boolean()
      .default(false, 'Allow transfer of hidden files (default false)'),
    /**
     * Default file name
     * @type {string}
     * @default index.html
     */
    'index': joi.string()
      .default('index.html', 'Default file name (default index.html)'),
    /**
     * If true, serves after return next(), allowing any downstream middleware to respond first
     * @type {boolean}
     */
    'defer': joi.boolean(),
    /**
     * Try to serve the gzipped version of a file automatically when gzip is supported by a client
     * and if the requested file with .gz extension exists
     * @type {boolean}
     * @default true
     */
    'gzip': joi.boolean()
      .default(true, 'Try to serve the gzipped version of a file automatically' +
      ' when gzip is supported by a client' +
      ' and if the requested file with .gz extension exists (default true)'),
    /**
     * Function to set custom headers on response.
     * https://github.com/koajs/send#setheaders
     * @type {function}
     */
    'setHeaders': joi.func()
      .arity(3),
    /**
     * Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served
     * @type {boolean}
     * @default false
     */
    'extensions': joi.boolean()
      .default(false, 'Try to match extensions from passed array' +
      ' to search for file when no extension is sufficed in URL.' +
      ' First found is served. (defaults to false)'),
  }),
  /**
   * Koa Middlewares
   * @type {object}
   */
  'middlewares': joi.object().keys({
    /**
     * Order Middlewares
     * @type {array}
     */
    'order': joi.array()
      .items('string')
  })
    // Keys must all contain functions
    .pattern(/^((?!order).*|(.(?!order).)*)$/, joi.func().arity(2))
    .requiredKeys('order'),
  /**
   * SSL options
   * Cert and key or pfx to create HTTPS server
   * @type {object}
   */
  'ssl': joi.object().keys({
    /**
     * Private Key .key
     * @type {string}
     */
    'key': joi.string(),
    /**
     * Certificate PEM .pem
     * @type {string}
     */
    'cert': joi.string(),
  }),
  /**
   * SPDY options
   * @type {object}
   */
  'spdy': joi.object().keys({
    /**
     * list of NPN/ALPN protocols to use
     * @type {array}
     * @default ['h2','spdy/3.1','spdy/3','spdy/2','http/1.1','http/1.0']
     */
    'protocols': joi.array()
      .items('string'),
    /**
     * If defined, server will ignore NPN and ALPN data and choose whether to use spdy or plain http by looking at first data packet.
     * @type {boolean}
     */
    'plain': joi.boolean(),
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
    'connection': joi.object().keys({
      /**
       * Server's window siz
       * @type {number}
       */
      'windowSize': joi.number()
        .integer(),
      /**
       * If true - server will send 3.1 frames on 3.0 *plain* spdy
       * @type {boolean}
       */
      'autoSpdy31': joi.boolean()
    })
  }),
  /**
   * The port to bind the web server to
   * @type number
   * @default 3000
   */
  'port': joi.number()
    .integer()
    .default(3000),
  /**
   * The host to bind the web server to
   * @type string
   * @default localhost
   */
  'host': joi.string()
    .default('localhost')
})
