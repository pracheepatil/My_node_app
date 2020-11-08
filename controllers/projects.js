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
    .catch(err => res.sendStatus(500).send(err))
}

exports.getProject = (req, res) => {
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Standard"){
            if(isNaN(req.params.id)){
                res.sendStatus(400).send({
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
                    res.send(data[0])
                }
            })
            .catch(err => res.sendStatus(500).send(err))
        }else {
            res.sendStatus(401)
        }
       
    })
    .catch(err => res.sendStatus(403).send(
       { message: "Token Not Valid"}
    ))
}

exports.createProject= (req, res) => {
    verifyToken(req.headers.authorization).then(() => {
        models.project.create(req.body)
        .then((data) => res.sendStatus(201).send(data))
        .catch(err => res.sendStatus(500).send(err))  
    })
    .catch(err => res.sendStatus(403).send(
        {message: "Token Not Valid"}
    ))
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
        .catch(err => res.sendStatus(500).send(err))
    })
    .catch(err => res.sendStatus(403).send(
        {message: "Token Not Valid"}
    ))
   
}

exports.deleteProject = (req, res) => {
    verifyToken(req.headers.authorization).then(() => {
        models.project.destroy({
                where: {
                    id: req.params.id
                }
            })
        .then(data => res.send(data))
        .catch(err => res.sendStatus(500).send(err))
    })
    .catch(err => res.sendStatus(403).send(
        {message: "Token Not Valid"}
    ))   
}