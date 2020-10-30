// const sequelize = require('./config/database')

// branch = require('./models/Branch');
// college = require('./models/college');
// student = require('./models/student');
// projects = require('./models/projects');
// cbmapping = require('./models/CBmapping');
// projectMapping = require('./models/projectMapping');

// student.belongsTo(branch);
// student.belongsTo(college);

// cbmapping.belongsTo(college, {foreignKey: 'college_id'}); //for college branch mapping
// college.hasMany(cbmapping, {foreignKey: 'college_id'});

// cbmapping.belongsTo(branch, {foreignKey: 'branch_id'});
// branch.hasMany(cbmapping, {foreignKey: 'branch_id'});

// projectMapping.belongsTo(student, {foreignKey: 'student_id'}); //for project mapping
// student.hasMany(projectMapping, {foreignKey: 'student_id'});

// projectMapping.belongsTo(college, {foreignKey: 'college_id'});
// college.hasMany(projectMapping, {foreignKey: 'college_id'});

// projectMapping.belongsTo(projects, {foreignKey: 'project_id'});
// projects.hasMany(projectMapping, {foreignKey: 'project_id'});

// sequelize.sync({alter:true}).then(() => {
//     console.log("models created");
// })
// .catch(err => console.log("Error", err));



// var exp = Date.now().year();
// console.log(exp)

// if(exp < Date.now()){
//     console.log(true)
// }else{
//     console.log(false)
// }

// const exp = Math.floor(Date.now() / 1000) + (60 * 60) 
// if (Date.now() <= exp * 1000) {
//     console.log(true, 'token is not expired')
//   } else { 
//     console.log(false, 'token is expired') 
//   }
const exp = Date.now();
if(Date.now() <exp * 1000){
    console.log(true)
}
else{
    console.log(false)
}