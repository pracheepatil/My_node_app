const models = require('../models');
const {verifyToken} = require('../utils/jwtUtils')

exports.getAllUserTypes = (req, res) => {
        models.userType.findAll()
        .then(data => {
            if(data.length === 0){
                res.sendStatus(204);
            }else {
                res.send(data)
            }
        })
        .catch(err => res.status(500).send(err))
    
}

exports.getUserType = (req, res) => {
    if(isNaN(req.params.id)){
        res.status(400).send({
            message: "id should be integer"
        })
    }
    models.userType.findAll({
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

exports.createUserType = (req, res) => {
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            models.userType.create(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send(err))
      
        }else {
            res.sendStatus(401);
        }
    })
    .catch(err => res.status(401).send(err))
}

exports.updateUserType= (req, res) => {
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            const updateData = req.body.updateData;
            models.userType.update(
                updateData,
                {where: {
                        id: req.body.id
                    }
                })
            .then(data => res.send({msg: "User Type Updated"}))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(401)
        }
    })
    .catch(err => res.status(403).send(err))
}

exports.deleteUserType = (req, res) => {
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            if(isNaN(req.params.id)){
                res.status(400).send({
                    message: "id should be integer"
                })
            }
            models.userType.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => res.send({msg: "User Type Deleted"}))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(401)
        }       
    })
    .catch(err => res.status(403).send(err))
}