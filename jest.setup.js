const models = require('./models');
require('mysql2/node_modules/iconv-lite').encodingExists('foo');


beforeAll(async (done) => {
    await models.sequelize.drop()
    await models.sequelize.sync({alter:true})
    done();
})

afterAll(done => {
    models.sequelize.close();
    done();
})

jest.setTimeout(1000 * 60 * 60 * 60) // one hour