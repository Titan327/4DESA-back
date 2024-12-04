//const User = require('../models/user.model');
require('dotenv').config();

async function GetAllUsers(req, res) {
    try {
        res.status(200).json({ success: "hello world" });
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
}

module.exports = {
    GetAllUsers
};
