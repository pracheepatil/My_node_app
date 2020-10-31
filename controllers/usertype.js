const models = require('../models');
const {verifyToken} = require('../utils/jwtUtils')

exports.getAllUserTypes = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "Admin"){
            models.usertype.findAll()
            .then(data => {
                if(data.length === 0){
                    res.sendStatus(204);
                }else {
                    res.send(data)
                }
            })
            .catch(err => res.status(500).send(err))
        }else{
            res.sendStatus(401);
        }
    })
    .catch(err => res.send({
        message: "Token Not Valid"
    }).status(401))
}

exports.getUserType = (req, res) => {
    verifyToken(req.header.authorization).then(() => {
        if(isNaN(req.params.id)){
            res.status(400).send({
                message: "id should be integer"
            })
        }
        models.usertype.findAll({
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
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.send({
        message: "Token Not Valid"
    }).status(401))
}

exports.createUserType = (req, res) => {
    // verifyToken(req.header.authorization).then((data) => {
    //     if(data.type == "Admin"){
            models.usertype.create(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send(err))
    //     }else {
    //         res.sendStatus(401);
    //     }
    // })
    // .catch(err => res.send({
    //     message: "Token Not Valid"
    // }).status(401))
}

exports.updateUserType= (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "Admin"){
            const updateData = req.body.updateData;
            models.usertype.update(
                updateData,
                {where: {
                        id: req.body.id
                    }
                })
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(401)
        }
    })
    .catch(err => res.send({
        message: "Token Not Valid"
    }).status(401))
}

exports.deleteUserType = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "Admin"){
            models.usertype.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err))
        }
       
    })
    .catch(err => res.send({
        message: "Token Not Valid"
    }).status(401))
}