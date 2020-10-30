const models = require(".");

module.exports = (sequelize, DataTypes) => {
    const ProjectMapping = sequelize.define('projectmapping', 
    {}, { 
        timestamps: false,
        uniqueKeys: {
            composite_unique: {
                fields: ['studentId', 'collegeId', 'projectId']
            }
        }
    });

    ProjectMapping.associate = (models) => {
        models.student.hasMany(models.projectmapping); 
        models.college.hasMany(models.projectmapping);    
        models.project.hasMany(models.projectmapping);  
    };
   return ProjectMapping;
}