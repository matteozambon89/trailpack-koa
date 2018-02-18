/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-18 02:29:11
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-18 02:29:38
 */

'use strict'

/**
 * @module DefaultService
 *
 * @description Default Service included with a new Trails app
 * @see {@link http://trailsjs.io/doc/api/services}
 * @this TrailsApp
 */
module.exports = class DefaultService extends Service {

  /**
   * Return some info about this application
   */
  getApplicationInfo() {
    return {
      app: this.app.pkg.version
    }
  }

}
