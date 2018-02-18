/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 11:34:11
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-17 11:59:10
 */

const joi = require('joi')

module.exports = joi.object().keys({
  /**
  * Socket.io package
  * @type {function}
  * @required
  */
  socketIo: joi.func(),
  /**
   * Better customize Socket
   * @type {function}
   * @required
   */
  init: joi.func(),
  /**
  * Socket params
  * @type {function}
  */
  params: joi.object(),
  /**
   * Socket Cluster
   * @type {object}
   * @default false
   */
  cluster: joi.alternatives()
    .try(
      joi.object(),
      joi.boolean()
    )
    .default(false)
})
