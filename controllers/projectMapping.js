const models = require('../models');
const {verifyToken} = require('../utils/jwtUtils')

exports.getProjectMappings = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "standard"){
            models.projectMapping.findAll()
            .then(data => {
                if(data.length === 0){
                    res.sendStatus(204);
                }else {
                    res.send(data)
                }
            })
            .catch(err => res.status(500).send(err))
        }else{
            res.sendStatus(401)
        }          
    })
    .catch(err => res.status(403).send(
       { message: "Token Not Valid"}
    ))
}

exports.getProjectMapping = (req, res) => {
    verifyToken(req.header.authorization).then(() => {
        if(data.type == "standard"){
            if(isNaN(req.params.id)){
                res.status(400).send({
                    message: "id should be integer"
                })
            }
            models.projectMapping.findAll({
                where: {
                    id: req.params.id
                }
            }).then(data => {
                if(data.length === 0){
                    res.sendStatus(404); 
                }else {
                    res.send(data[0])
                }
            })
            .catch(err => res.status(500).send(err))   
        }else{
            res.sendStatus(401)
        }    
    })
    .catch(err => res.status(403).send(
       { message: "Token Not Valid"}
    ))
}

exports.createProjectMapping = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "standard"){
            models.projectMapping.create(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send(err))
        }else{
            res.sendStatus(401)
        }  
    })
    .catch(err => res.status(403).send(
        {message: "Token Not Valid"}
    ))
}

exports.updateProjectMapping = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "standard"){
            models.projectMapping.update({
                name: req.body.name
            },
            {where: {
                    id: req.params.id
                }
            })
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err))
        }else{
            res.sendStatus(401)
        }  
    })
    .catch(err => res.status(403).send(
        {message: "Token Not Valid"}
    ))
}

exports.deleteProjectMapping = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "standard"){
            models.projectMapping.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err))
        }else{
            res.sendStatus(401)
        }  
    })
    .catch(err => res.status(403).send(
        {message: "Token Not Valid"}
    ))
}