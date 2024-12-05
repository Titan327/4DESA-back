const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/db.config');

const User = sequelize.define("User", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
});

sequelize.sync().then(() => {
    console.log('User table created successfully!');
}).catch((error) => {
    console.error('Unable to create table User : ', error);
});

module.exports = User;
