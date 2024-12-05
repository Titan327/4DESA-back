const { DataTypes } = require('sequelize');
const sequelize = require('../configurations/db.config');


const Comment = sequelize.define("Comment", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId : {
        type: DataTypes.INTEGER,
        allowNull: false
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

sequelize.sync().then(() => {
    console.log('Comment table created successfully!');
}).catch((error) => {
    console.error('Unable to create table Comment : ', error);
});

module.exports = Comment;