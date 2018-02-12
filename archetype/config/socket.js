/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-12 01:13:40
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-12 01:15:05
 */

'use strict'

module.exports = {
  /**
  * Socket.io package
  * @type {function}
  * @required
  */
  'socketIo': require('socket.io'),
  /**
   * Cluster
   * @type {object}
   */
  'cluster': {
    // /**
    //  * Specifies the process count and is omittable.
    //  * If omitted the core count of the processor will be used instead.
    //  * @type {number}
    //  */
    // 'num': os.cpus().length,
    // /**
    //  * Specifies if the layer 4 patching should be used or not, needed if behind a proxy.
    //  * @type {boolean}
    //  */
    // 'proxy': false,
    // /**
    //  * Specifies the header containing the real user IP and is omittable.
    //  * If omitted the header defaults to x-forwarded-for.
    //  * Also the header is case-insenstive.
    //  * @type {string}
    //  */
    // 'header': 'x-forwarded-for',
    // /**
    //  * True will proxy even if the header is missing in a request.
    //  * Needed for compatibility with some reverse proxies.
    //  * @type {boolean}
    //  */
    // 'ignoreMissingHeader': false,
    // /**
    //  * Object containing information to manually call the sync of the initial packet and is also omittable.
    //  * If omitted the behavior defaults to not syncing.
    //  * @type {object}
    //  */
    // 'sync': {
    //   /**
    //    * Specifies if sync is used or not.
    //    * @type {boolean}
    //    */
    //   'isSyncable': false,
    //   /**
    //    * Specifies on which event sticky-sessions should listen if isSyncable is set to true.
    //    * @type {string}
    //    */
    //   'event': '...'
    // }
  },
  /**
  * Handler for .on('connection')
  * @type {function}
  * @required
  */
  'onConnection': function(socket) {
    const io = this

    console.log(`Socket ${socket.id} connected (${io.engine.clientsCount} total).`)
  },
}
