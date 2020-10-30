module.exports = (sequelize, DataTypes) => {
    const UserType = sequelize.define('usertype', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false });

    UserType.associate = (models) => {
        models.usertype.hasMany(models.student);     
    };
   return UserType;
}