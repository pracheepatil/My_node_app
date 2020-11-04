module.exports = (sequelize, DataTypes) => {
    const College = sequelize.define('college', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true, 
            allowNull: false     
       },
       name: {
           type: DataTypes.STRING,  
           allowNull: false 
       }
    }, { timestamps: false });
   
    College.associate = (models) => {
        models.college.hasMany(models.collegeBranchMap);     
        models.college.hasMany(models.projectMapping);
    };

    return College;
}
