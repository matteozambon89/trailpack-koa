/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:17:42
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-12 12:43:34
 */

/**
 * Trailpack Configuration
 *
 * @see {@link http://trailsjs.io/doc/trailpack/config
 */
module.exports = {
  type: 'misc',
  /**
   * Configure the lifecycle of this pack; that is, how it boots up, and which
   * order it loads relative to other trailpacks.
   */
  lifecycle: {
    configure: {
      /**
       * List of events that must be fired before the configure lifecycle
       * method is invoked on this Trailpack
       */
      listen: [],

      /**
       * List of events emitted by the configure lifecycle method
       */
      emit: []
    },
    initialize: {
      listen: ['trailpack:router:initialized'],
      emit: ['webserver:http:ready']
    }
  }
}
