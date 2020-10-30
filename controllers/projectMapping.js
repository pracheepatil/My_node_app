const models = require('../models');
const {verifyToken} = require('../utils/jwtUtils')

exports.getProjectMappings = (req, res) => {
    verifyToken(req.header.authorization).then(() => {
         models.projectmapping.findAll()
        .then(data => {
            if(data.length === 0){
                res.sendStatus(204);
            }else {
                res.send(data)
            }
        })
        .catch(err => res.status(500).send(err))
           
    })
    .catch(err => res.send({
        message: "Token Not Valid"
    }).status(401))
}

exports.getProjectMapping = (req, res) => {
    verifyToken(req.header.authorization).then(() => {
        if(isNaN(req.params.id)){
            res.status(400).send({
                message: "id should be integer"
            })
        }
        models.projectmapping.findAll({
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
    })
    .catch(err => res.send({
        message: "Token Not Valid"
    }).status(401))
}

exports.createProjectMapping = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        models.projectmapping.create(req.body)
        .then(data => res.status(201).send(data))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.send({
        message: "Token Not Valid"
    }).status(401))
}

exports.updateProjectMapping = (req, res) => {
    verifyToken(req.header.authorization).then(() => {
        models.projectmapping.update({
            name: req.body.name
        },
        {where: {
                id: req.params.id
            }
        }).then(data => res.send(data))
        .catch(err => res.status(500).send(err))
        })
    .catch(err => res.send({
        message: "Token Not Valid"
    }).status(401))
}

exports.deleteProjectMapping = (req, res) => {
    verifyToken(req.header.authorization).then(() => {
        models.projectmapping.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.send({
        message: "Token Not Valid"
    }).status(401))
}