const Ajv = require('ajv');
const ajv = new Ajv();
const path = require('path')
const fs = require('fs')

const basePath = path.join(__dirname, '../jsonSchema');
//console.log(basePath)

const Schema = require('../jsonSchema/branch.json');
for(let [key, schema] of Object.entries(Schema)) {
  ajv.addSchema(schema, key)
}

// fs.readdirSync(basePath)
//     .filter(file => file.indexOf('.') !== 0 && file.slice(-4) == 'json')
//     .forEach(file => {
//         const schemaFile = require(path.join(basePath, file))
//         //console.log(model)
//         for(let [key, schema] of Object.entries(schemaFile)) {
//           console.log(`${key} : ${schema}`)
//           ajv.addSchema(schema, key)

//             // console.log(`${schema} : ${key}`)
//         }
//     })
