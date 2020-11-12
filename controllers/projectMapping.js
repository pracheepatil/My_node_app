const models = require('../models');
const {verifyToken} = require('../utils/jwtUtils')

exports.getProjectMappings = (req, res) => {
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Standard"){
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
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Standard"){
            
            if(isNaN(parseInt(req.params.id))){
                res.sendStatus(400).send({
                    message: "id should be integer"
                })
            }
            models.projectMapping.findAll({
                where: {
                    id: parseInt(req.params.id)
                },
                include: {
                    model: models.project,
                    required: true     
                }
            }).then(data => {
                if(data.length === 0){
                    res.sendStatus(404); 
                }else {
                    res.send(data)
                }
            })
            .catch(err => res.sendStatus(500).send(err))   
        }else{
            res.sendStatus(401)
        }    
    })
    .catch(err => res.sendStatus(403).send(
       { message: "Token Not Valid"}
    ))
}

exports.createProjectMapping = (req, res) => {
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Standard"){
            models.projectMapping.create(req.body)
            .then(data => res.sendStatus(201).send(data))
            .catch(err => res.sendStatus(500).send(err))
        }else{
            res.sendStatus(401)
        }  
    })
    .catch(err => res.sendStatus(403).send(
        {message: "Token Not Valid"}
    ))
}

exports.updateProjectMapping = (req, res) => {
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Standard"){
            models.projectMapping.update({
                name: req.body.name
            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(data => res.send(data))
            .catch(err => res.sendStatus(500).send(err))
        }else{
            res.sendStatus(401)
        }  
    })
    .catch(err => res.sendStatus(403).send(
        {message: "Token Not Valid"}
    ))
}

exports.deleteProjectMapping = (req, res) => {
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Standard"){
            models.projectMapping.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => res.send(data))
            .catch(err => res.sendStatus(500).send(err))
        }else{
            res.sendStatus(401)
        }  
    })
    .catch(err => res.sendStatus(403).send(
        {message: "Token Not Valid"}
    ))
}