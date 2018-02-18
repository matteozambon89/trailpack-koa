/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-12 01:13:40
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-18 12:00:09
 */

'use strict'

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
