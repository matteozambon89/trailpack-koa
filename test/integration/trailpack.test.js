/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:17:42
 * @Last modified by:   Matteo
 * @Last modified time: 2018-03-07 08:01:43
 */

'use strict'

const {expect} = require('chai')

const Koa = require('koa')

const http = require('http')
const https = require('https')
const spdy = require('spdy')

const socketIo = require('socket.io')

describe('Trailpack', () => {

  it('should be loaded into the app.packs collection', () => {
    expect(global.app.packs.koa).to.exist
  })

  describe('#validate', () => {
    it.skip('TODO test')
  })

  describe('#configure', () => {
    it('should set koa into app.config.web.server', () => {
      expect(global.app.config.web.server).to.exist
      expect(global.app.config.web.server).to.be.a('string')
      expect(global.app.config.web.server).to.be.equal('koa')
    })
  })

  describe('#initialize', () => {
    it('should create web server (http, https or spdy) instance into app.packs.koa', () => {
      expect(global.app.packs.koa.nativeServer).to.exist

      expect(global.app.packs.koa.nativeServer).to.satisfy((nativeServer) => {
        return (nativeServer instanceof http.Server) ||
        (nativeServer instanceof https.Server) ||
        (nativeServer instanceof spdy.Server)
      })
    })

    it('should create web socket (Socket.io) instance into app.packs.koa', () => {
      expect(global.app.packs.koa.socket).to.exist

      expect(global.app.packs.koa.socket).to.satisfy((socket) => {
        return (socket instanceof socketIo)
      })
    })
  })
})
