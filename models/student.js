module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('student', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false   
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {timestamps: false});
    return Student;
}