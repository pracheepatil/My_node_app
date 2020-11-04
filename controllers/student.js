const models = require('../models');
const bcrypt = require('bcrypt');
const {generateToken, verifyToken} = require('../utils/jwtUtils')

const saltRounds = 10;

exports.createStudent = (req, res) => {
    const student = req.body;
    student.userTypeId = 2;
    bcrypt.hash(student.password, saltRounds, function(err, hash) {
        if (err) {
            res.status(500).send(err);
        } else {
            student.password = hash;
            models.student.create(student)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send(err))
        }
    })
}

exports.sign_in = (req, res) => {
    models.student.findOne({
        where: {
            email: req.body.email
        },
        include: {
            model: models.userType,
            required: true
        }
    })
    .then(data => {
        bcrypt.compare(req.body.password, data.password, function(err, hash){
            if (err) {
                res.status(403).send({err: 'invalid password'});
            } else {
                const student = {
                    email: data.email,
                    userType: data.type,
                    userId: data.id,
                }

                Promise.all([
                    generateToken(student),
                    generateToken(student, true)
                ]).then(tokens => {
                    res.send({
                        Authorization: tokens[0],
                        refreshToken: tokens[1],
                    });
                }).catch(err => res.status(500).send(err));
            }
        })
    })
    .catch(err => res.status(500).send(err))
}

exports.getStudents = (req, res) => {
    // verifyToken(req.header.authorization).then((data) => {
    //     if(data.type == "Admin"){
            models.student.findAll()
            .then(data => {
                    if(data.length === 0){
                        res.sendStatus(204);
                    }else {
                        res.send(data)
                    }
            })
            .catch(err => res.status(500).send(err))
    //     }else {
    //         res.sendStatus(401)
    //     }
    // })
    // .catch(err => res.status(403).send(
    //     {message: "Token Not Valid"}
    // ))
}

exports.getStudent = (req, res) => {
    if(isNaN(req.params.id)){
        res.status(400).send({
            message: "id should be integer"
        })
    }
    models.student.findOne({
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
    // verifyToken(req.header.authorization).then(() => {
    //     const updateData = req.body.updateData;
        models.student.update(
            req.body.updateData,
            {where: {
                    id: req.body.id
                }
        })
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
    // })
    // .catch(err => res.status(403).send(
    //     {message: "Token Not Valid"}
    // ))
}

exports.deleteStudent = (req, res) => {
    // verifyToken(req.header.authorization).then(() => {
        if(isNaN(req.params.id)){
            res.status(400).send({
                message: "id should be integer"
            })
        }
        models.student.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
    // })
    // .catch(err => res.status(403).send(
    //     {message: "Token Not Valid"}
    // ))
}