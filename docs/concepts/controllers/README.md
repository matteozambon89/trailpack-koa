## How to use controllers with Koa

### Fastest Way : Use Yeoman

```Bash
  yo trails:controller ExampleController
```

With Yeoman you don't need to create the file and include it in index.js

### First Step : Write your controller

The convention is that controllers has to be written in api/controllers.

```JavaScript
/**
 * FILE: api/controllers/Example.js
 */
'use strict'

const Controller = require('trails-controller')

/**
* @module ExampleController
* @description This is the example controller
*/
module.exports = class ExampleController extends Controller {
  async sayHello(ctx) {
    // Your own logic

    ctx.body = 'Hello World'
  }
}

```
### Second Step : Load your controller

```JavaScript
/**
 * FILE: api/controllers/index.js
 */

'use strict'

module.exports = {}
exports.Example = require('./Example')

```

### Third Step : Declare your controller in config/route file

```JavaScript
/**
 * FILE: config/route.js
 * The following Controllers are example of what you can do with Trails Controllers
 */

module.exports = {

  // #-1 Call controller when GET /example/sayHello is requested
  {
    method: [ 'GET' ],
    path: '/example/sayHello',
    handler: 'Example.sayHello'
  }

  // #-2 Call policy then controller when GET /example/sayHello is requested
  {
    method: [ 'GET' ],
    path: '/example/sayHello',
    handler: 'Example.sayHello',
    config: {
      pre: ['ExamplePolicy.test']
    }
  }

  // #-3 Set CORS then call policy then controller when GET /example/sayHello is requested
  {
    method: [ 'GET' ],
    path: '/example/sayHello',
    handler: 'Example.sayHello',
    config: {
      cors: {
        origin: '*.trailsjs.io'
      },
      pre: ['ExamplePolicy.test']
    }
  }

  // #-4 Redirect to /example/sayHello when GET /example/sayHelloOld is requested
  {
    method: [ 'GET' ],
    path: '/example/sayHelloOld',
    handler: {
      redirect: true,
      to: '/example/sayHello',
      code: 304
    },
    config: {
      cors: {
        origin: '*.trailsjs.io'
      },
      pre: ['ExamplePolicy.test']
    }
  }

  // #-5 Serve static folder /public when GET /example/sayHello/static is requested
  {
    method: [ 'GET' ],
    path: '/example/sayHello/static',
    handler: {
      serve: true,
      directory: '/public'
    },
    config: {
      cors: {
        origin: '*.trailsjs.io'
      },
      pre: ['ExamplePolicy.test']
    }
  }

  // #-6 Extend Koa router when /example/sayHello/custom is requested
  {
    method: [ 'GET' ],
    path: '/example/sayHello/custom',
    handler: (app, koa, router, route) => {
      // app => TrailsJs App
      // koa => Koa App
      // router => General Koa Router instance (the one used by trailpack-koa)
      // route => TrailsJs Route

      // #-6.1 Return a list of custom middlewares to let trailpack-koa attach current route to router
      return [
        (ctx, next) => {
          // custom middleware
        }
      ]

      // #-6.2 Return empty response to stop trailpack-koa to attach current route to router
      return
    }
  }
}

```
