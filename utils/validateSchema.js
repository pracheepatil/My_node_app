const Ajv = require('ajv');
const ajv = new Ajv();
const path = require('path')
const fs = require('fs')

const basePath = path.join(__dirname, '../jsonSchema');

fs.readdirSync(basePath)
    .filter(file => file.indexOf('.') !== 0 && file.slice(-4) == 'json')
    .forEach(file => {
        const schemaDetails = require(path.join(basePath, file))
        for(let [key, schema] of Object.entries(schemaDetails)) {
          ajv.addSchema(schema, key)
        }
    });


module.exports = ajv;