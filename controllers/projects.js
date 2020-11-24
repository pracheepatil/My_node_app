const models = require('../models');
const {verifyToken} = require('../utils/jwtUtils')

exports.getProjects = (req, res) => {
    models.project.findAll()
    .then(data => {
        if(data.length === 0){
            res.sendStatus(204);
        }else {
            res.send(data)
        }
    })
    .catch(err => res.status(500).send(err))
}

exports.getProject = (req, res) => {
    if(isNaN(req.params.id)){
        res.status(400).send({
            message: "id should be integer"
        })
    }
    models.project.findAll({
        where: {
                id: req.params.id
        }
    })
    .then(data => {
        if(data.length === 0){
            res.sendStatus(404); 
        }else {
            res.send(data)
        }
    })
    .catch(err => res.status(500).send(err))
}

exports.createProject= (req, res) => {
    verifyToken(req.headers.authorization).then(() => {
        models.project.create(req.body)
        .then((data) => res.status(201).send(data))
        .catch(err => res.status(500).send(err))  
    })
    .catch(err => res.status(403).send(err))
}

exports.updateProject = (req, res) => {
    verifyToken(req.headers.authorization).then(() => {
        const updateData = req.body.updateData;
        models.project.update(
            updateData,
            {where: {
                    id: req.body.id
                }
            })
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(403).send(err))
   
}

exports.deleteProject = (req, res) => {
    verifyToken(req.headers.authorization).then(() => {
        models.project.destroy({
                where: {
                    id: req.params.id
                }
            })
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(403).send(err))   
}