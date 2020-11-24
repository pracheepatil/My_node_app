const models = require('../models');
const {verifyToken} = require('../utils/jwtUtils')

exports.getCollegeBranchMaps = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.userType.name == "Admin"){     //admin
            models.collegeBranchMap.findAll()
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

exports.getCollegeBranchMap = (req, res) => {
    verifyToken(req.header.authorization).then(() => {
        if(data.userType.name == "Admin"){
            if(isNaN(req.params.id)){
                res.status(400).send({
                    message: "id should be integer"
                })
            }
            models.collegeBranchMap.findAll({
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
        }else {
            res.sendStatus(401);
        }
    })
    .catch(err => res.status(403).send(err))
}

exports.createCollegeBranchMap = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            models.collegeBranchMap.create(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(401)
        }        
    })
    .catch(err => res.sendStatus(403).send(err))
}

exports.updateCollegeBranchMap = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            models.collegeBranchMap.update({
                collegeId: req.body.collegeId,
                branchId: req.branchId
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
    .catch(err => res.status(403).send(err))
}

exports.destroyCollegeBranchMap = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            models.collegeBranchMap.destroy({
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
    .catch(err => res.status(403).send(err))
}
