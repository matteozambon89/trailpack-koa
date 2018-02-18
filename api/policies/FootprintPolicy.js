/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-12 11:29:54
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-13 01:08:00
 */

'use strict'

const _ = require('lodash')
const Boom = require('boom')

/**
 * Footprint Policy
 *
 * Validate footprint reqs; namely, that the path parameters represent
 * actual and correct models anda actions. Semantic ORM input validation is
 * performed by the FootprintService.
 *
 */
module.exports = class Footprint extends Policy {

  /**
   * Create Policy.
   * @see FootprintController.create
   */
  create(ctx, next) {
    const req = ctx.request

    if (!_.isPlainObject(req.body) && !_.isArray(req.body)) {
      throw Boom.preconditionFailed(this.__('errors.footprints.body'))
    }

    next()
  }

  /**
   * Find Policy.
   * @see FootprintController.find
   */
  find(ctx, next) {
    const criteria = this.app.packs.koa.getCriteriaFromQuery(this.query)

    if (ctx.params.id && !_.isEmpty(criteria)) {
      throw Boom.preconditionFailed(this.__('errors.footprints.find.mutex'))
    }

    next()
  }

  /**
   * Update Policy.
   * @see FootprintController.update
   */
  update(ctx, next) {
    if (ctx.params.id && !_.isEmpty(this.query)) {
      throw Boom.preconditionFailed(this.__('errors.footprints.update.mutex'))
    }

    next()
  }

  /**
   * Destroy Policy.
   * @see FootprintController.destroy
   */
  destroy(ctx, next) {
    if (ctx.params.id && !_.isEmpty(this.query)) {
      throw Boom.preconditionFailed(this.__('errors.footprints.destroy.mutex'))
    }

    next()
  }

  /**
   * Create Association Policy.
   * @see FootprintController.createAssociation
   */
  createAssociation(ctx, next) {
    const req = ctx.request

    if (!_.isPlainObject(req.body)) {
      throw Boom.preconditionFailed(this.__('errors.footprints.body'))
    }

    next()
  }

  /**
   * Find Association Policy.
   * @see FootprintController.findAssociation
   */
  findAssociation(ctx, next) {
    const criteria = this.app.packs.koa.getCriteriaFromQuery(this.query)
    if (ctx.params.childId && !_.isEmpty(criteria)) {
      throw Boom.preconditionFailed(this.__('errors.footprints.find.mutex'))
    }

    next()
  }

  /**
   * Update Association Policy.
   * @see FootprintController.updateAssociation
   */
  updateAssociation(ctx, next) {
    if (ctx.params.childId && !_.isEmpty(this.query)) {
      throw Boom.preconditionFailed(this.__('errors.footprints.update.mutex'))
    }

    next()
  }

  /**
   * Destroy Association Policy.
   * @see FootprintController.destroyAssociation
   */
  destroyAssociation(ctx, next) {
    if (ctx.params.childId && !_.isEmpty(this.query)) {
      throw Boom.preconditionFailed(this.__('errors.footprints.destroy.mutex'))
    }

    next()
  }
}
