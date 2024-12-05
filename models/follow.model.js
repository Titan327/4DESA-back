const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/db.config');

const Follow = sequelize.define("Follow", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userFollowedId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    followAccepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});

module.exports = Follow;
