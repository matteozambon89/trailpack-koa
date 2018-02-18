/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:17:42
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-18 04:43:56
 */

'use strict'

const TrailsApp = require('trails')

//Allow self signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

before(() => {
  global.app = new TrailsApp(require('./app'))

  return global.app.start()
})

after(() => {
  return global.app.stop()
})
