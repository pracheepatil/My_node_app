const models = require('../models');
const { collegeBranchMap, branch } = require('../routes/routeMap');
const {verifyToken} = require('../utils/jwtUtils')

exports.getColleges = (req, res) => {              //tested
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

exports.getCollege = (req, res) => {               //tested
        if(isNaN(req.params.id)){
            res.status(400).send({
                message: "id should be integer"
            })
        }
        models.college.findAll({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: models.collegeBranchMap,
                    include: [
                        {
                           model: models.branch
                        }
                    ]
                },

            ]
        })
        .then(data => {
            
            if(data.length === 0){
                res.sendStatus(404); 
            }else {
                
                 for(let i = 0; i<=data[0].collegeBranchMaps.length; i++){ 
                    console.log(data[0].collegeBranchMaps[i].branch.dataValues);    
                }  
                res.send('HI')              
            }
        })
        .catch(err => {
            console.log("HELLLOOOO");
            res.status(500).send(err)
        })
}

exports.createCollege = (req, res) => {                   //tested
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            models.college.create(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(403)
        }  
    })
    .catch(err => res.status(401).send(err))
}

exports.updateCollege = (req, res) => {                 //tested        
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            models.college.update(
                req.body.updateData,
                {where: {
                        id: req.body.id
                    }
            })
            .then(data => res.send({msg: 'College Updated'}))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(403)
        }      
    })
    .catch(err => res.status(401).send(err))
}

exports.deleteCollege = (req, res) => {                //tested
    verifyToken(req.headers.authorization).then((data) => {
        if(data.userType.name == "Admin"){
            models.college.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(data => res.send({msg: 'College deleted'}))
            .catch(err => res.status(500).send(err))
        }else {
            res.sendStatus(403)
        }    
    })
    .catch(err => res.status(401).send(err))
}