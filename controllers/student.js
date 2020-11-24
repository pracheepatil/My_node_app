const models = require('../models');
const bcrypt = require('bcrypt');
const {generateToken, verifyToken} = require('../utils/jwtUtils')

const saltRounds = 10;

exports.createStudent = (req, res) => {             //tested
    const student = req.body;
    bcrypt.hash(student.password, saltRounds, function(err, hash) {
        if (err) {
            res.status(500).send(err);
        } else {
            student.password = hash;
            models.student.create(student)
            .then(data => {
                const newData = {
                    firstName: data.fname,
                    lastName: data.lname,
                    email: data.email,
                    phone: data.phone
                }
                res.status(201).send(newData)
            })
            .catch(err => res.status(500).send(err))
        }
    })
}

exports.sign_in = (req, res) => {                 //tested
   
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
            console.log("Hey am student data = ", data)
            if (err) {
                res.status(403).send({err: 'invalid password'});
            } else {
                const student = {
                    email: data.email,
                    userType: data.userType.dataValues,
                    userId: data.id,
                    userTypeId: data.userTypeId
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

exports.getStudents = (req, res) => {               //tested
   
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            models.student.findAll()
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

exports.getStudent = (req, res) => {
    if(isNaN(req.params.id)){
        res.status(400).send({
            message: "id should be integer"
        })
    }
    models.student.findAll({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: models.projectMapping,
                include: [
                    {
                       model: models.project
                    }
                ]
            },

        ]
    })
    .then(data => {
        if(data.length === 0){
            res.sendStatus(404); 
        }else {
            for(let i = 0; i<=data[0].projectMappings.length; i++){ 
                console.log(data[0].projectMappings[i].project.dataValues);    
            } 
        }
    })
    .catch(err => res.status(500).send(err))
}

exports.updateStudent = (req, res) => {              //tested
    verifyToken(req.headers.authorization).then(() => {
        const updateData = req.body.updateData;
        models.student.update(updateData)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(403).send(err))
}

exports.deleteStudent = (req, res) => {
    verifyToken(req.headers.authorization).then((data) => {
        if(data.student.name == "Admin"){
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
        }else {
            res.sendStatus(401)
        }       
    })
    .catch(err => res.status(403).send(err))
}

exports.getRenewEDToken = (req, res) => {
    verifyToken(req.headers.refreshtoken, true)
    .then((data) => {
        generateToken(data).then((token) => {
            res.send({
                Authorization: token
            });
        }).catch(err => console.log(err))
    })
    .catch(err => res.status(403).send(err))
}
