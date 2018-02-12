/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-12 12:44:26
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-12 01:12:43
 */

'use strict'

const env = require('env-var')

module.exports = {
  /**
   * Koa package
   * @type {function}
   * @required
   */
  'koa': require('koa'),
  /**
   * Better customize Koa
   * @type {function}
   */
  'init': (trailsApp, koaApp) => {},
  /**
   * Signed cookie keys
   * @type {array}
   */
  // 'keys': ['im a newer secret', 'i like turtle'],
  /**
   * Enable/Disable onError handler
   * @type {boolean}
   * @default true
   */
  'onError': true,
  /**
   * Compress options (https://github.com/koajs/compress)
   * @type {object}
   */
  'compress': {},
  /**
   * CORS options (https://github.com/koajs/cors)
   * @type {object}
   */
  'cors': {
    // 'origin': '*',
    // 'allowMethods': 'GET,HEAD,PUT,POST,DELETE,PATCH',
    // 'exposeHeaders': '',
    // 'allowHeaders': '',
    // 'maxAge': 0,
    // 'credentials': true,
    // 'keepHeadersOnError': false,
  },
  /**
   * Koa session
   * @type {object}
   */
  'session': {
    // /**
    //  * Session key
    //  * @type {string}
    //  * @default koa:sess
    //  */
    // 'key': 'koa:sess',
    // /**
    //  * Session max age
    //  * @type {number|string}
    //  * @default 86400000
    //  */
    // 'maxAge': 24 * 60 * 60 * 1000,
    // /**
    //  * Can overwrite or not
    //  * @type {boolean}
    //  * @default true
    //  */
    // 'overwrite': true,
    // /**
    //  * Only for HTTP or not
    //  * @type {boolean}
    //  * @default true
    //  */
    // 'httpOnly': trie,
    // /**
    //  * Signed or not
    //  * @type {boolean}
    //  * @default true
    //  */
    // 'signed': true,
    // /**
    //  * Force a session identifier cookie to be set on every response.
    //  * The expiration is reset to the original maxAge, resetting the expiration countdown.
    //  * @type {boolean}
    //  * @default false
    //  */
    // 'rolling':false,
    // /**
    //  * Renew session when session is nearly expired, so we can always keep user logged in.
    //  * @type {boolean}
    //  * @default false
    //  */
    // 'renew': false,
  },
  /**
   * Body parser options (https://github.com/koajs/bodyparser)
   * @type {object}
   */
  'bodyparser': {
    // /**
    //  * Parser will only parse when request type hits enableTypes.
    //  * @type {array}
    //  * @default ['json','form']
    //  */
    // 'enableTypes': ['json','form'],
    // /**
    //  * Requested encoding
    //  * @type {string}
    //  * @default utf-8
    //  */
    // 'encode': 'utf-8',
    // /**
    //  * Limit of the urlencoded body.
    //  * If the body ends up being larger than this limit, a 413 error code is returned.
    //  * @type {string}
    //  * @default 56kb
    //  */
    // 'formLimit': '56kb',
    // /**
    //  * Limit of the json body
    //  * @type {string}
    //  * @default 1mb
    //  */
    // 'jsonLimit': '1mb',
    // /**
    // * Limit of the text body
    // * @type {string}
    // * @default 1mb
    //  */
    // 'textLimit': '1mb',
    // /**
    //  * When set to true, JSON parser will only accept arrays and objects
    //  * @type {boolean}
    //  * @default true
    //  */
    // 'strict': true,
    // /**
    //  * Custom json request detect function
    //  * @type {function}
    //  * @default null
    //  */
    // 'detectJSON': null,
    // /**
    //  * Support extend types:
    //  * {
    //  *   json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
    //  * }
    //  * @type {object}
    //  */
    // 'extendTypes': {
    //   'json': ['application/x-javascript'],
    //   'text': [],
    //   'form': [],
    // },
    // /**
    //  * Support custom error handle, if koa-bodyparser throw an error, you can customize the response
    //  * @type {string}
    //  */
    // 'onerror': (ctx, next) => {},
  },
  /**
   * Static options (https://github.com/koajs/static)
   * @type {object}
   */
  'static': {
    // /**
    //  * Path exposed to public
    //  * @type {string}
    //  * @required
    //  */
    // 'publicPath': '...',
    // /**
    //  * Browser cache max-age in milliseconds
    //  * @type {number}
    //  * @default 0
    //  */
    // 'maxage': 0,
    // /**
    //  * Allow transfer of hidden files
    //  * @type {boolean}
    //  * @default false
    //  */
    // 'hidden': false,
    // /**
    //  * Default file name
    //  * @type {string}
    //  * @default index.html
    //  */
    // 'index': 'index.html',
    // /**
    //  * If true, serves after return next(), allowing any downstream middleware to respond first
    //  * @type {boolean}
    //  */
    // 'defer': false,
    // /**
    //  * Try to serve the gzipped version of a file automatically when gzip is supported by a client
    //  * and if the requested file with .gz extension exists
    //  * @type {boolean}
    //  * @default true
    //  */
    // 'gzip': true,
    // /**
    //  * Function to set custom headers on response.
    //  * https://github.com/koajs/send#setheaders
    //  * @type {function}
    //  */
    // 'setHeaders': (res, path, stats) => {},
    // /**
    //  * Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served
    //  * @type {boolean}
    //  * @default false
    //  */
    // 'extensions': false,
  },
  /**
   * Koa Middlewares
   * @type {object}
   */
  'middlewares': {
    /**
     * Order Middlewares
     * @type {array}
     */
    'order': [
      'compress',
      'cors',
      'session',
      'bodyparser',
      'static',
      'router',
      '404'
    ]
  },
  /**
   * SSL options
   * Cert and key or pfx to create HTTPS server
   * @type {object}
   */
  // 'ssl': {
  //   /**
  //    * Private Key .key
  //    * @type {string}
  //    */
  //   'key': fs.readFileSync('path/to/private.key'),
  //   /**
  //    * Certificate PEM .pem
  //    * @type {string}
  //    */
  //   'cert': fs.readFileSync('path/to/certificate.pem'),
  // },
  /**
   * SPDY options
   * @type {object}
   */
  'spdy': {
    // /**
    //  * list of NPN/ALPN protocols to use
    //  * @type {array}
    //  * @default ['h2','spdy/3.1','spdy/3','spdy/2','http/1.1','http/1.0']
    //  */
    // 'protocols': ['h2','spdy/3.1','spdy/3','spdy/2','http/1.1','http/1.0'],
    // /**
    //  * If defined, server will ignore NPN and ALPN data and choose whether to use spdy or plain http by looking at first data packet.
    //  * @type {boolean}
    //  */
    // 'plain': false,
    // /**
    //  * Parse first incoming X_FORWARDED_FOR frame and put it to the
    //  * headers of every request.
    //  * NOTE: Use with care! This should not be used without some proxy that
    //  * will *always* send X_FORWARDED_FOR
    //  */
    // 'x-forwarded-for': false,
    // /**
    //  * SPDY Connection options
    //  * @type {object}
    //  */
    // 'connection': {
    //   /**
    //    * Server's window siz
    //    * @type {number}
    //    */
    //   'windowSize': 24 * 60 * 60 * 1000,
    //   /**
    //    * If true - server will send 3.1 frames on 3.0 *plain* spdy
    //    * @type {boolean}
    //    */
    //   'autoSpdy31': false
    // }
  },
  /**
   * The port to bind the web server to
   * @type number
   * @default 3000
   */
  'port': env.get('PORT', 3000).asIntPositive(),
  /**
   * The host to bind the web server to
   * @type string
   * @default localhost
   */
  'host': env.get('HOST', 'localhost').asString()
}
