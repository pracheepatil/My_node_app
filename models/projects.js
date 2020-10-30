module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
           
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
            
        },
    }, { timestamps: false });

    Project.associate = (models) => {
        models.project.hasMany(models.projectmapping);     
    };
    return Project;
}