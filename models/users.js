module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('users', {
        userId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            required: true,
        },
        email: {
            type: DataTypes.STRING,
            required: true,
        },
        status: {
            type: DataTypes.STRING,
            required: true,
        },
        roleType: {
            type: DataTypes.STRING,
            required: true,
        },
        mobile: {
            type: DataTypes.STRING,
            required: true,
        },
        markAsDeleted: {
            type: DataTypes.BOOLEAN,
            required: true,
            defaultValue: false
        }
    }, {
        timeStamps: true
    });

    Users.sync({
        alter: true
    }).then((result) => { }).catch((error) => { });

    return Users;
}