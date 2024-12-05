const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/db.config');
const Content = require('./content.model');

const User = sequelize.define("User", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(60), // 60 -> longueur classique de la string crée par bcrypt
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});


module.exports = User;
