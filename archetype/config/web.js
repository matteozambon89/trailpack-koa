/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-12 01:13:34
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-17 11:58:17
 */

'use strict'

const env = require('env-var')

module.exports = {
  /**
   * Koa package
   * @type {function}
   * @required
   */
  koa: require('koa'),
  /**
   * Better customize Koa
   * @type {function}
   * @required
   */
  init: (trailsApp, koaApp) => {},
  /**
   * SSL options
   * Cert and key or pfx to create HTTPS server
   * @type {object}
   */
  // ssl: {
  //   /**
  //    * Private Key .key
  //    * @type {string}
  //    */
  //   key: '...',
  //   /**
  //    * Certificate PEM .pem
  //    * @type {string}
  //    */
  //   cert: '...'
  // },
  /**
   * SPDY options
   * @type {object}
   */
  // spdy: {
  //   /**
  //    * list of NPN/ALPN protocols to use
  //    * @type {array}
  //    * @default ['h2','spdy/3.1','spdy/3','spdy/2','http/1.1','http/1.0']
  //    */
  //   protocols: ['h2','spdy/3.1','spdy/3','spdy/2','http/1.1','http/1.0'],
  //   /**
  //    * If defined, server will ignore NPN and ALPN data and choose whether to use spdy or plain http by looking at first data packet.
  //    * @type {boolean}
  //    */
  //   plain: false,
  //   /**
  //    * Parse first incoming X_FORWARDED_FOR frame and put it to the
  //    * headers of every request.
  //    * NOTE: Use with care! This should not be used without some proxy that
  //    * will *always* send X_FORWARDED_FOR
  //    */
  //   'x-forwarded-for': false,
  //   /**
  //    * SPDY Connection options
  //    * @type {object}
  //    */
  //   connection: {
  //     /**
  //      * Server's window size
  //      * @type {number}
  //      */
  //     windowSize: 1024 * 1024,
  //     /**
  //      * If true - server will send 3.1 frames on 3.0 *plain* spdy
  //      * @type {boolean}
  //      */
  //     autoSpdy31: false
  //   }
  // },
  /**
   * The port to bind the web server to
   * @type number
   * @default 3000
   */
  port: env.get('PORT', 3000).asIntPositive(),
  /**
   * The host to bind the web server to
   * @type string
   * @default localhost
   */
  host: env.get('HOST', 'localhost').asString(),

  /**
   * Feature for koa.context.onerror handler
   * @type {boolean|function}
   * @default true
   */
  onError: true,
  /**
   * Feature koa-compress
   * https://www.npmjs.com/package/koa-compress
   * @type {boolean|object}
   * @default true
   */
  compress: true,
  /**
   * Feature koa-cors
   * https://www.npmjs.com/package/koa-cors
   * @type {boolean|object}
   * @default true
   */
  cors: true,
  /**
   * Feature koa-session
   * https://www.npmjs.com/package/koa-cors
   * @type {boolean|object}
   */
  session: true,
  /**
   * Feature koa-bodyparser
   * https://www.npmjs.com/package/koa-bodyparser
   * @type {object}
   */
  bodyparser: true,

  /**
   * Middlewares
   * @type {object}
   */
  // middlewares: {},
  /**
   * Middlewares Order
   * @type {object}
   */
  // middlewaresOrder: [
  //   'compress',
  //   'cors',
  //   'session',
  //   'bodyparser',
  //   'router',
  //   '404'
  // ]
}
