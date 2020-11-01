const Sequelize = require('sequelize');
const config = require('../config/config.json');
const fs = require('fs');
const path = require('path');

const db = process.env.NODE_ENV === 'test' ? config.dbTest : config.db;

const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
    timezone: db.timezone,
    logging: false
})

const models = {};

fs.readdirSync(__dirname)
   .filter(file => {
        if(file.charAt(0) !== '.' && file !== 'index.js'){
           const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
           models[model.name] = model;
        }
    })
    
Object.keys(models).forEach((key) => {
    if (models[key].associate) {
        models[key].associate(models);
    }
});

models.sequelize = sequelize
models.Sequelize = Sequelize


module.exports = models;


