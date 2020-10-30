 const express = require('express');
 const router = express.Router();
 const routeMapData = require('./routeMap');

const controllerPath = '../controllers'
const path = require('path')

for(let [controllerFile, routeMap] of Object.entries(routeMapData)){
    const controllers = require(path.join(controllerPath, controllerFile));  
    for(let [method, routes] of Object.entries(routeMap)){
        for(let route of routes){
            for (let [url, controllerFunction] of Object.entries(route)) {
                router[method](url, controllers[controllerFunction]);   //controllerFunction gives cntroller function
            }
        }
    }  
}
    
module.exports = router;