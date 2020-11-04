module.exports = (sequelize, DataTypes) => {
    const UserType = sequelize.define('userType', {
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

    UserType.associate = (models) => {
        models.userType.hasMany(models.student);     
    };
   return UserType;
}