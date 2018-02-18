/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-11 01:17:42
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-17 05:25:57
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
    it.skip('TODO test')
  })

  describe('#initialize', () => {
    it('should create Koa instance into app.packs.koa', () => {
      expect(global.app.packs.koa.server).to.exist
      expect(global.app.packs.koa.server).to.be.an.instanceof(Koa)
    })

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
