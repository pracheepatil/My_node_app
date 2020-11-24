const models = require('../models');
const {verifyToken} = require('../utils/jwtUtils')

exports.getProjectMappings = (req, res) => {
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            models.projectMapping.findAll()
            .then(data => {
                if(data.length === 0){
                    res.sendStatus(204);
                }else {
                    res.send(data)
                }
            })
            .catch(err => res.status(500).send(err))   
        }else {
            res.sendStatus(401)
        }      
    })
    .catch(err => res.status(403).send(err))
}

exports.getProjectMapping = (req, res) => {
    verifyToken(req.headers.authorization).then(() => {       
            if(isNaN(req.params.id)){
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
            .catch(err => res.status(500).send(err))      
    })
    .catch(err => res.status(403).send(err))
}

exports.createProjectMapping = (req, res) => {
    verifyToken(req.headers.authorization).then(() => {
            models.projectMapping.create(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send(err))  
    })
    .catch(err => res.status(403).send(err))
}

exports.updateProjectMapping = (req, res) => {
    verifyToken(req.headers.authorization).then(() => {
            const updateData = req.body.updateData
            models.projectMapping.update(updateData,
            {where: {
                    id: req.params.id
                }
            })
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err)) 
    })
    .catch(err => res.status(403).send(err))
}

exports.deleteProjectMapping = (req, res) => {
    verifyToken(req.headers.authorization).then(() => {
            models.projectMapping.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err))
 
    })
    .catch(err => res.status(403).send(err))
}