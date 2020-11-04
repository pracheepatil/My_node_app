const express = require('express');
require('dotenv').config();

const models = require('./models');
const router = require('./routes')
const ajv = require('./utils/validateSchema');

const PORT = 4000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    let valid = false;
    
    if (req.method === 'POST' || req.method === 'PUT') {
        const schemaKey = `${req.method.toLowerCase()}${req.url.split('api')[1]}`;
        valid = ajv.validate(schemaKey, req.body);
    } else {
       valid = true
    }
    if (!valid) {
        res.status(400).send(ajv.errorsText())
    }
    next();
}) 

app.use('/api', router);

if (process.env.NODE_ENV !== 'dev') {
    console.log(`Starting server on ${PORT}...`);
    
    models.sequelize.sync({alter:true}).then(() => {
        app.listen(PORT, () => {
            console.log('\x1b[34m', "Server Started... ");
        })
    })
    .catch(err => console.log("Error", err));
}

module.exports = app;