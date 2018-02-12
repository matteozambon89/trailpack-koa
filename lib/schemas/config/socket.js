/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 11:34:11
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-12 12:49:26
 */

const joi = require('joi')

module.exports = joi.object().keys({
  /**
  * Socket.io package
  * @type {function}
  * @required
  */
  'socketIo': joi.func()
    .required(),
  /**
   * Cluster
   * @type {object}
   */
  'cluster': joi.object().keys({
    /**
     * Specifies the process count and is omittable.
     * If omitted the core count of the processor will be used instead.
     * @type {number}
     */
    'num': joi.number()
      .integer(),
    /**
     * Specifies if the layer 4 patching should be used or not, needed if behind a proxy.
     * @type {boolean}
     */
    'proxy': joi.boolean(),
    /**
     * Specifies the header containing the real user IP and is omittable.
     * If omitted the header defaults to x-forwarded-for.
     * Also the header is case-insenstive.
     * @type {string}
     */
    'header': joi.string(),
    /**
     * True will proxy even if the header is missing in a request.
     * Needed for compatibility with some reverse proxies.
     * @type {boolean}
     */
    'ignoreMissingHeader': joi.boolean(),
    /**
     * Object containing information to manually call the sync of the initial packet and is also omittable.
     * If omitted the behavior defaults to not syncing.
     * @type {object}
     */
    'sync': joi.object().keys({
      /**
       * Specifies if sync is used or not.
       * @type {boolean}
       */
      'isSyncable': joi.boolean(),
      /**
       * Specifies on which event sticky-sessions should listen if isSyncable is set to true.
       * @type {string}
       */
      'event': joi.string()
    })
  }),
  /**
  * Handler for .on('connection')
  * @type {function}
  * @required
  */
  'onConnection': joi.func()
    .required(),
})
