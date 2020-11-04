const app = require('../../server');
const request = require('supertest');
const { post } = require('../../server');

describe('branch APIs', () => {
    
    it('create the branch', (done) => {
        request(app)
             .post('/api/branch')
             .send({name : 'ENTC'})
             .set('Accept', 'application/json')
             .expect('Content-Type', /json/)
             .expect(201)
             .end(done)
    })

    it('should get branch(s)', (done) => {
        request(app)
            .get('/api/allBranches')
            .expect(200)
            .end(done)
    })

//    it("updates the student with put", async () => {
//         const newBranch = await request(app)
//             .post('/api/branch')
//             .send({
//                 name: "Raisoni"
//             })
//         const removeBranch = await request(app)
//             .put('/api/branch')
//             .expect(200);
//     })

    it("deletes the branch", async () => {
        const newBranch = await request(app)
            .post("/api/branch")
            .send({
                name: "JSPM"
            })
        const removeBranch = await request(app).delete(
            `/api/branch/2`
        );
        expect(200);
    })



})