/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-18 01:57:24
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-18 02:28:13
 */

'use strict'

/**
 * @module DefaultController
 *
 * @description Default Controller included with a new Trails app
 * @see {@link http://trailsjs.io/doc/api/controllers}
 * @this TrailsApp
 */
module.exports = class DefaultController extends Controller {
  notFound(ctx, next) {
    ctx.throw(404)

    next()
  }
  serverError(ctx, next) {
    ctx.throw(500)

    next()
  }
  info(ctx, next) {
    ctx.body = this.app.services.DefaultService.getApplicationInfo()

    next()
  }
  policySuccess(ctx, next) {
    ctx.body = this.app.services.DefaultService.getApplicationInfo()

    next()
  }
  policyFail(ctx, next) {
    ctx.body = this.app.services.DefaultService.getApplicationInfo()

    next()
  }
  policyIntercept(ctx, next) {
    ctx.body = this.app.services.DefaultService.getApplicationInfo()

    next()
  }
  echo(ctx, next) {
    ctx.body = ctx.request.body

    next()
  }
}
