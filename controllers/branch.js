const models = require('../models');
const {verifyToken} = require('../utils/jwtUtils')

exports.getAllBranches = (req, res) => {
    models.branch.findAll()
    .then(data => {
        if(data.length === 0){
            res.sendStatus(204);
        }else {
            res.status(200).send(data)
        }
    })
    .catch(err => res.status(500).send(err))
}

exports.getBranch = (req, res) => {              // needs to check
    if(isNaN(req.params.id)){
        res.sendStatus(400).send({
            message: "id should be integer"
        })
    }
    models.branch.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(data => { 
        if(data.length === 0){
            res.sendStatus(404); 
        }else {
            res.status(200).send(data)
        }
    })
    .catch(err => res.status(500).send(err))
}

exports.createBranch = (req, res) => {                    //tested
   verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == 'Admin'){
            models.branch.create(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(401)
        }      
    })
    .catch(err => res.status(403).send(err))
}

exports.updateBranch = (req, res) => {                                //tested
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == 'Admin'){
            const updateData = req.body.updateData;
            models.branch.update(
                updateData,
                {where: {
                        id: req.body.id
                    }
                })
            .then(data => res.send({msg: 'Branch Updated'}))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(401)
        }     
    })
    .catch(err => res.status(403).send(err))
}

exports.deleteBranch = (req, res) => {             //tested
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            models.branch.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => res.send({msg: 'Branch Deleted'}))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(403)
        }    
    })
    .catch(err => res.status(401).send(err))
}