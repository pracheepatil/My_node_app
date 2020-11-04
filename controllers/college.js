const models = require('../models');
const {verifyToken} = require('../utils/jwtUtils')

exports.getColleges = (req, res) => {
    models.college.findAll()
    .then(data => {
        if(data.length === 0){
            res.sendStatus(204);
        }else {
            res.send(data)
        }
    })
    .catch(err => res.status(500).send(err))      
}

exports.getCollege = (req, res) => {
    verifyToken(req.header.authorization).then(() => {
        if(isNaN(req.params.id)){
            res.status(400).send({
                message: "id should be integer"
            })
        }
        models.college.findAll({
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
    .catch(err => res.status(403).send(
        {message: "Token Not Valid"}
    ))
}

exports.createCollege = (req, res) => {
    // verifyToken(req.header.authorization).then((data) => {
    //     if(data.type == "Admin"){
            models.college.create(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send(err))
        // }else {
        //     res.sendStatus(403)
        // }  
    // })
    // .catch(err => res.status(401).send(
    //     {message: "Token Not Valid"}
    // ))
}

exports.updateCollege = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "Admin"){
            models.college.update(
                req.body.updateData,
                {where: {
                        id: req.body.id
                    }
            })
            .then(data => {
                res.send(data)
                console.log(data)
            })
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(403)
        }      
    })
    .catch(err => res.status(401).send(
        {message: "Token Not Valid"}
    ))
}

exports.deleteCollege = (req, res) => {
    verifyToken(req.header.authorization).then((data) => {
        if(data.type == "Admin"){
            models.college.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(403)
        }    
    })
    .catch(err => res.status(401).send(
       { message: "Token Not Valid"}
    ))
}