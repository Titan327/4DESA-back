const Content = require('../models/content.model');
require('dotenv').config();

async function postContent(req, res){
    try {
        const userId = req.user.id;
        const { text } = req.body;

        await Content.create({
            text: text,
            userId: userId
        }).then((result) => {
            return res.status(200).json({ success: result });
        }).catch(() => {
            return res.status(500).json({ error: "Une erreur interne au serveur est surenue, veuiller contacter les administrateurs" });
        });
    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue" });
    }

}


module.exports = {
    postContent
};