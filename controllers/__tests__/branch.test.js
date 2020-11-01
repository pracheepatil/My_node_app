const app = require('../../server');
const request = require('supertest');

describe('branch APIs', () => {
    it('should get branch(s)', (done) => {
        request(app)
            .get('/api/students')
            .expect(204)
            .end(done)
    })
})