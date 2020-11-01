const controller = require('../controllers/college.js')

const { TestScheduler } = require('jest');

let collegeId;

describe("Post Request", () => {
    let collegeDetails;
    beforeEach(function() {
        console.log("Input College name")
        collegeDetails = {
            "name": "Raisoni College"
        }
    });
    afterEach(function() {
        console.log(`College is Created with  ${collegeId}`,)
    })
})