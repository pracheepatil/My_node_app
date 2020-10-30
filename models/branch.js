module.exports = (sequelize, DataTypes) => {
    const Branch = sequelize.define('branch', {
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

    Branch.associate = (models) => {
        models.branch.hasMany(models.student);     
    };
   return Branch;
}