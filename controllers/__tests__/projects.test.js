const app = require('../../server');
const request = require('supertest');
const { post } = require('../../server');

describe('Project APIs', () => {

    it('create the Project', (done) => {
        request(app)
            .post('/api/project')
            .send({name: "Electronic health record"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(done)
    })

    it('get the projects', (done) => {
        request(app)
            .get('/api/projects')
            .expect(200)
            .end(done)
    })

    it('delete the project', (done) => {
         request(app)
              .delete('/api/project/1')
              .expect(200)
              .end(done)

    })
})
