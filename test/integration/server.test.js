/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-15 08:15:09
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-18 02:20:39
 */

'use strict'

const {expect} = require('chai')

describe('Koa options', () => {

  it('should execute init method', () => {
    expect(global.app.packs.koa.server.initOk).to.be.true
  })

  it('should override onerror', () => {
    expect(global.app.packs.koa.server.context.onerror).to.exist
    expect(global.app.packs.koa.server.context.onerror).to.be.a('function')
  })

  it('should setup middlewares', () => {
    expect(global.app.config.web.middlewares.compress).to.exist
    expect(global.app.config.web.middlewares.compress).to.be.a('function')

    expect(global.app.config.web.middlewares.cors).to.exist
    expect(global.app.config.web.middlewares.cors).to.be.a('function')

    expect(global.app.config.web.middlewares.session).to.exist
    expect(global.app.config.web.middlewares.session).to.be.a('function')

    expect(global.app.config.web.middlewares.bodyparser).to.exist
    expect(global.app.config.web.middlewares.bodyparser).to.be.a('function')

    expect(global.app.config.web.middlewares.respond).to.exist
    expect(global.app.config.web.middlewares.respond).to.be.a('function')

    expect(global.app.config.web.middlewares['404']).to.exist
    expect(global.app.config.web.middlewares['404']).to.be.a('function')
  })

})
