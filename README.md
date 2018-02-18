# trailpack-koa

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Donate][donate-image]][donate-url]

Use Koa as your Trails server

> support web socket, http, https and spdy

## Dependencies

- TrailsJS@^3
- Koa@^2

## Compatibilities

- Footprint

## Install

**NPM**
```sh
$ npm install --save trailpack-koa
```
**Yarn**
```sh
$ yarn add trailpack-koa
```

## Configure

### Main

```js
// config/main.js
module.exports = {
  packs: [
    // ... other trailpacks
    require('trailpack-koa')
  ]
}
```

### Web

```js
const env = require('env-var')

// config/web.js
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
```

### Socket

```js
// config/socket.js
module.exports = {
  /**
  * Socket.io package
  * @type {function}
  * @required
  */
  scoketIo: require('socket.io'),
  /**
   * Better customize Scoket.io
   * @type {function}
   * @required
   */
  init: (trailsApp, koaApp) => {},
  /**
   * Socket.io parameters
   * https://www.npmjs.com/package/socket.io
   * @type {object}
   */
  // params: {},
  /**
   * Socket.io sticky session parameters
   * https://www.npmjs.com/package/socketio-sticky-session
   * @type {boolean|object}
   * @default false
   */
  cluster: false
}
```

## Controllers / Routes

Doc for Controllers and Routes can be found [here](./docs/concepts/controllers/README.md)!

## Policies

Doc for Policies can be found [here](./docs/concepts/policies/README.md)!

## Credits

- Written based on [trailpack-express](https://github.com/trailsjs/trailpack-express) and [trailpack-hapi](https://github.com/trailsjs/trailpack-hapi)
- [Koa](https://koajs.com)

## Please Contribute!

I'm happy to receive contributions of any kind!

## Did you like my work?
Help me out with a little donation, press on the button below.
[![Donate][donate-image]][donate-url]

[npm-image]: https://img.shields.io/npm/v/trailpack-koa.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-koa
[ci-image]: https://img.shields.io/travis/matteozambon89/trailpack-koa/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/matteozambon89/trailpack-koa
[daviddm-image]: http://img.shields.io/david/matteozambon89/trailpack-koa.svg?style=flat-square
[daviddm-url]: https://david-dm.org/matteozambon89/trailpack-koa
[codeclimate-image]: https://img.shields.io/codeclimate/github/matteozambon89/trailpack-koa.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/matteozambon89/trailpack-koa
[donate-image]: https://img.shields.io/badge/Donate-PayPal-green.svg
[donate-url]: matteo.zambon.89@gmail.com
