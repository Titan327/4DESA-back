const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/db.config');
const User = require('../models/user.model');

const Content = sequelize.define("Content", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imgLink: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
    },
});

sequelize.sync().then(() => {
    console.log('Content table created successfully!');
}).catch((error) => {
    console.error('Unable to create table Content : ', error);
});

module.exports = Content;