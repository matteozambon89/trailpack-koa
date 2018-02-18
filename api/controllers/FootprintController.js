/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-12 11:41:41
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-13 01:07:52
 */

'use strict'

const Boom = require('Boom')

const manageErrors = (app, error) => {
  app.log.error(error)
  if (app.env.NODE_ENV != 'production') {
    app.log.warn('this payload error is return for development purpose only and will be only log on production')
    return error
  }
  return new Error()
}

/**
* Footprint Controller
*
* Parse the path and query params and forward them to the FootprintService.
* The FootprintService is provided by any ORM trailpack, e.g.
* trailpack-waterline, trailpack-sequelize, etc.
*
*/
module.exports = class FootprintController extends Controller {
  create(ctx, next) {
    const req = ctx.request

    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.koa.getOptionsFromQuery(this.query)

    FootprintService.create(ctx.params.model, req.body, options)
      .then(elements => {
        ctx.body = elements || {}
        next()
      }).catch(err => {
        if (err.code == 'E_VALIDATION') {
          throw Boom.boomify(err, { 'statusCode': 400 })
        }
        else if (err.code == 'E_NOT_FOUND') {
          throw Boom.boomify(err, { 'statusCode': 404 })
        }
        else {
          throw Boom.boomify(manageErrors(this.app, err), { 'statusCode': 500 })
        }
      })

  }

  find(ctx, next) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.koa.getOptionsFromQuery(this.query)
    const criteria = this.app.packs.koa.getCriteriaFromQuery(this.query)
    const id = ctx.params.id
    let response
    if (id) {
      response = FootprintService.find(ctx.params.model, id, options)
    }
    else {
      response = FootprintService.find(ctx.params.model, criteria, options)
    }

    response.then(elements => {
      if (!elements) {
        throw Boom.notFound('Not Found')
      }
      ctx.body = elements || {}
      next()
    }).catch(err => {
      if (err.code == 'E_VALIDATION') {
        throw Boom.boomify(err, { 'statusCode': 400 })
      }
      else if (err.code == 'E_NOT_FOUND') {
        throw Boom.boomify(err, { 'statusCode': 404 })
      }
      else {
        throw Boom.boomify(manageErrors(this.app, err), { 'statusCode': 500 })
      }
    })

  }

  update(ctx, next) {
    const req = ctx.request

    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.koa.getOptionsFromQuery(this.query)
    const criteria = this.app.packs.koa.getCriteriaFromQuery(this.query)
    const id = ctx.params.id
    this.log.debug('[FootprintController] (update) model =',
      ctx.params.model, ', criteria =', this.query, id,
      ', values = ', req.body
    )
    let response
    if (id) {
      response = FootprintService.update(ctx.params.model, id, req.body, options)
    }
    else {
      response = FootprintService.update(ctx.params.model, criteria, req.body, options)
    }

    response.then(elements => {
      ctx.body = elements || {}
      next()
    }).catch(err => {
      if (err.code == 'E_VALIDATION') {
        throw Boom.boomify(err, { 'statusCode': 400 })
      }
      else if (err.code == 'E_NOT_FOUND') {
        throw Boom.boomify(err, { 'statusCode': 404 })
      }
      else {
        throw Boom.boomify(manageErrors(this.app, err), { 'statusCode': 500 })
      }
    })

  }

  destroy(ctx, next) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.koa.getOptionsFromQuery(this.query)
    const criteria = this.app.packs.koa.getCriteriaFromQuery(this.query)
    const id = ctx.params.id
    let response
    if (id) {
      response = FootprintService.destroy(ctx.params.model, id, options)
    }
    else {
      response = FootprintService.destroy(ctx.params.model, criteria, options)
    }

    response.then(elements => {
      ctx.body = elements || {}
      next()
    }).catch(err => {
      if (err.code == 'E_VALIDATION') {
        throw Boom.boomify(err, { 'statusCode': 400 })
      }
      else if (err.code == 'E_NOT_FOUND') {
        throw Boom.boomify(err, { 'statusCode': 404 })
      }
      else {
        throw Boom.boomify(manageErrors(this.app, err), { 'statusCode': 500 })
      }
    })

  }

  createAssociation(ctx, next) {
    const req = ctx.request

    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.koa.getOptionsFromQuery(this.query)

    FootprintService.createAssociation(
      ctx.params.parentModel,
      ctx.params.parentId,
      ctx.params.childAttribute,
      req.body,
      options
    ).then(elements => {
      ctx.body = elements || {}
      next()
    }).catch(err => {
      if (err.code == 'E_VALIDATION') {
        throw Boom.boomify(err, { 'statusCode': 400 })
      }
      else if (err.code == 'E_NOT_FOUND') {
        throw Boom.boomify(err, { 'statusCode': 404 })
      }
      else {
        throw Boom.boomify(manageErrors(this.app, err), { 'statusCode': 500 })
      }
    })

  }

  findAssociation(ctx, next) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.koa.getOptionsFromQuery(this.query)
    const criteria = this.app.packs.koa.getCriteriaFromQuery(this.query)
    const parentModel = ctx.params.parentModel
    const parentId = ctx.params.parentId
    const childAttribute = ctx.params.childAttribute
    const childId = ctx.params.childId
    let response
    if (childId) {
      response = FootprintService.findAssociation(
        parentModel,
        parentId,
        childAttribute,
        childId,
        options
      )
    }
    else {
      response = FootprintService.findAssociation(
        parentModel,
        parentId,
        childAttribute,
        criteria,
        options
      )
    }

    response.then(elements => {
      if (!elements) {
        throw Boom.notFound('Not Found')
      }
      ctx.body = elements || {}
      next()
    }).catch(err => {
      if (err.code == 'E_VALIDATION') {
        throw Boom.boomify(err, { 'statusCode': 400 })
      }
      else if (err.code == 'E_NOT_FOUND') {
        throw Boom.boomify(err, { 'statusCode': 404 })
      }
      else {
        throw Boom.boomify(manageErrors(this.app, err), { 'statusCode': 500 })
      }
    })
  }

  updateAssociation(ctx, next) {
    const req = ctx.request

    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.koa.getOptionsFromQuery(this.query)
    const criteria = this.app.packs.koa.getCriteriaFromQuery(this.query)
    const parentModel = ctx.params.parentModel
    const parentId = ctx.params.parentId
    const childAttribute = ctx.params.childAttribute
    const childId = ctx.params.childId
    let response
    if (childId) {
      response = FootprintService.updateAssociation(
        parentModel,
        parentId,
        childAttribute,
        childId,
        req.body,
        options
      )
    }
    else {
      response = FootprintService.updateAssociation(
        parentModel,
        parentId,
        childAttribute,
        criteria,
        req.body,
        options
      )
    }

    response.then(elements => {
      ctx.body = elements || {}
      next()
    }).catch(err => {
      if (err.code == 'E_VALIDATION') {
        throw Boom.boomify(err, { 'statusCode': 400 })
      }
      else if (err.code == 'E_NOT_FOUND') {
        throw Boom.boomify(err, { 'statusCode': 404 })
      }
      else {
        throw Boom.boomify(manageErrors(this.app, err), { 'statusCode': 500 })
      }
    })
  }

  destroyAssociation(ctx, next) {
    const FootprintService = this.app.services.FootprintService
    const options = this.app.packs.koa.getOptionsFromQuery(this.query)
    const criteria = this.app.packs.koa.getCriteriaFromQuery(this.query)
    const parentModel = ctx.params.parentModel
    const parentId = ctx.params.parentId
    const childAttribute = ctx.params.childAttribute
    const childId = ctx.params.childId
    let response
    if (childId) {
      response = FootprintService.destroyAssociation(
        parentModel,
        parentId,
        childAttribute,
        childId,
        options
      )
    }
    else {
      response = FootprintService.destroyAssociation(
        parentModel,
        parentId,
        childAttribute,
        criteria,
        options
      )
    }

    response.then(elements => {
      ctx.body = elements || {}
      next()
    }).catch(err => {
      if (err.code == 'E_VALIDATION') {
        throw Boom.boomify(err, { 'statusCode': 400 })
      }
      else if (err.code == 'E_NOT_FOUND') {
        throw Boom.boomify(err, { 'statusCode': 404 })
      }
      else {
        throw Boom.boomify(manageErrors(this.app, err), { 'statusCode': 500 })
      }
    })

  }
}
