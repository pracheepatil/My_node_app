const models = require('./models');

describe('main', () => {
    beforeAll(() => {
        models.sequelize.sync({alter:true}).then(() => console.log('db connected')).catch(() => console.log('connection error'));
        models.Sequelize.dropAllTables().then(() => console.log('tables deleted')).catch(() => console.log('deletion error'));
    })

    it('should do sample thing', () => {
        expect(1+1).toBe(2)
    })
}) 