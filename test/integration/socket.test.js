/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-15 08:15:09
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-17 03:14:49
 */

'use strict'

const {expect} = require('chai')

describe('socket options', () => {

  it('Should execute init method', () => {
    expect(global.app.packs.koa.socket.initOk).to.be.true
  })

})
