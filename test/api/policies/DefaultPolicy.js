/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-18 02:04:50
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-18 02:30:40
 */

'use strict'

/**
 * @module Default
 *
 * @description Default Policy not included with a new Trails app
 * @see {@link http://trailsjs.io/doc/api/policies}
 * @this TrailsApp
 */
module.exports = class DefaultPolicy extends Policy {
  intercept(ctx, next) {
    ctx.ok({result: 'intercept'})
  }

  success(ctx, next) {
    next()
  }

  fail(ctx, next) {
    ctx.throw(500, 'Policy fail')
  }
}
