const models = require('../models');
const {verifyToken} = require('../utils/jwtUtils')

exports.getAllBranches = (req, res) => {
    models.branch.findAll()
    .then(data => {
        if(data.length === 0){
            res.sendStatus(204);
        }else {
            res.send(data)
        }
      })
    .catch(err => res.status(500).send(err))
}

exports.getBranches = (req, res) => {
    if(isNaN(req.params.id)){
        res.status(400).send({
            message: "id should be integer"
        })
    }
    models.branch.findAll({
        include:[
            {
                model: models.collegeBranchMap,
                as: 'branches',
                where: {
                    collegeId: req.params.id
                }
            }
        ]
    })
    .then(data => {
        if(data.length === 0){
            res.sendStatus(404); 
        }else {
            res.send(data[0])
        }
    })
    .catch(err => res.status(500).send(err))
}

exports.createBranch = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "Admin"){
            models.branch.create(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(401)
        }      
    })
    .catch(err => res.send({
        message: "Token Not Valid"
    }).status(401))
}

exports.updateBranch = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "Admin"){
            models.branch.update({
                name: req.body.name
            },
            {where: {
                    id: req.params.id
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

exports.deleteBranch = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "Admin"){
            models.branch.destroy({
                where: {
                    id: req.params.id
                }
            }).then(data => res.send(data))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(401)
        }    
    })
    .catch(err => res.send({
        message: "Token Not Valid"
    }).status(401))
}