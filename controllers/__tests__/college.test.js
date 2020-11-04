const app = require('../../server');
const request = require('supertest');
const { post } = require('../../server');

describe('College APIs', () => {
 
    it('create the College', (done) => {
        request(app)
            .post('/api/college')
            .send({name : "Raisoni"})
            .set('Accept', 'application/json')
            .expect(201)
            .end(done)
    })

    it('get the college', (done) => {
        request(app)
            .get('/api/colleges')
            .expect(200)
            .end(done)
            
    })

    it('get specified college', (done) => {
        request(app)
            .get('/api/college/1')
            .expect(200)
            .end(done)
    })

    it('deletes the college', (done) => {
        request(app)
            .delete('/api/college/1')
            .expect(200)
            .end(done)


    })

})