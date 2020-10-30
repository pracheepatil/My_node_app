const models = require('../models');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/validate')

const saltRounds = 10;

exports.createStudent = (req, res) => {
    const student = req.body;
    bcrypt.hash(student.password, saltRounds, function(err, hash) {
      if(err) {
        res.status(500).send(err)
      }else {
        models.college.create(student).then((data) => {
            res.status(201).send(data)
        }).catch(err => {
            res.status(500).send(err)
        })
      }
    })
}

exports.sign_in = (req, res) => {
    models.student.findOne({
        where: {
            email: req.body.email
        },
        include: {
            model: models.usertype
        }
    })
    .then((data) => {
        bcrypt.compare(req.body.password, student.password, function(err, hash){
            if(err){
                res.sendStatus(500)
            }else{
                let student = {
                    email: data.email,
                    usertype: data.type,
                    exp: '1h'
                }
            
                jwt.sign(student, 'secret', function(err, token) {
                    if(err){
                        res.sendStatus(500)
                    }else{
                        res.send(token);
                    }
                })
            }
        })
    })
    .catch(err => res.status(500).send(err))
}

exports.getStudents = (req, res) => {
    models.student.findAll()
    .then(data => {
            if(data.length === 0){
                res.sendStatus(204);
            }else {
                res.send(data)
            }
    })
    .catch(err => res.status(500).send(err))
}

exports.getStudent = (req, res) => {
    if(isNaN(req.params.id)){
        res.status(400).send({
            message: "id should be integer"
        })
    }
    models.student.findAll({
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
}

exports.updateStudent = (req, res) => {
    if(isNaN(req.params.id)){
        res.status(400).send({
            message: "id should be integer"
        })
    }
    models.student.update(
        req.body,
        {where: {
                id: req.params.id
            }
    })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
}

exports.deleteStudent = (req, res) => {
    if(isNaN(req.params.id)){
        res.status(400).send({
            message: "id should be integer"
        })
    }
    models.college.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
}