module.exports = (sequelize, DataTypes) => {
    const ProjectMapping = sequelize.define('projectMapping', 
    {}, { 
        timestamps: false,
        uniqueKeys: {
            composite_unique: {
                fields: ['studentId', 'collegeId', 'projectId', 'branchId']
            }
        }
    });

    ProjectMapping.associate = (models) => {
        models.projectMapping.belongsTo(models.student);
        models.projectMapping.belongsTo(models.college);
        models.projectMapping.belongsTo(models.project);
        models.projectMapping.belongsTo(models.branch);
    };
   return ProjectMapping;
}