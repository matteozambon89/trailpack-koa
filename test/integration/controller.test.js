/**
 * @Author: Matteo Zambon <Matteo>
 * @Date:   2018-02-18 02:32:00
 * @Last modified by:   Matteo
 * @Last modified time: 2018-02-18 03:16:53
 */

'use strict'

const {expect} = require('chai')
const supertest = require('supertest')

describe('Koa controllers', () => {
  let request

  before(() => {
    request = supertest('https://localhost:3000')
  })

  describe('DefaultController', () => {
    describe('info', () => {
      it('should return 404 on GET /default', (done) => {
        request
          .get('/default')
          .expect(404)
          .end((err, res) => {
            done(err)
          })
      })
      it('should return {app: \'1.0.0\'} on GET /default/info', (done) => {
        request
          .get('/default/info')
          .expect(200)
          .end((err, res) => {
            if (!err) {
              const data = res.body

              expect(data).to.deep.equal({
                app: '1.0.0'
              })
            }

            done(err)
          })
      })
      it('should return {test: \'ok\'} POST on /default/info', (done) => {
        request
          .post('/default/info')
          .send({
            test: 'ok'
          })
          .expect(200)
          .end((err, res) => {
            if (!err) {
              const data = res.body

              expect(data).to.deep.equal({
                test: 'ok'
              })
            }

            done(err)
          })
      })
    })
  })
})
