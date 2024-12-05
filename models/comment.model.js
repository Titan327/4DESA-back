const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/db.config');


const Comment = sequelize.define("Comment", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});


module.exports = Comment;