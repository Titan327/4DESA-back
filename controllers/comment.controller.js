const Comment = require('../models/comment.model');
const {where} = require("sequelize");
const User = require("../models/user.model");
require('dotenv').config();

async function postComment(req, res){
    try {
        const userId = req.user.id;
        const { text, contentId } = req.body;

        await Comment.create({
            text: text,
            userId: userId,
            contentId: contentId
        }).then((result) => {
            return res.status(200).json({ success: result });
        }).catch(() => {
            return res.status(500).json({ error: "Une erreur interne au serveur est surenue, veuiller contacter les administrateurs" });
        });
    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue" });
    }

}

async function getCommentsOfContent(req, res){
    try {

        const { contentId,page } = req.body;

        const user = await User.findOne({
            where: { id: userId },
            attributes: ["public"],
        });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
        }

        if (user.public == 1 || userId === req.user.id) {

            await Comment.findAll({
                where: {contentId: contentId},
                limit: 10,
                offset:page*10,
            }).then((result) => {
                return res.status(200).json({ success: result });
            }).catch(() => {
                return res.status(500).json({ error: "Une erreur interne au serveur est surenue, veuiller contacter les administrateurs" });
            });

        }else {
            return res.status(401).json({ message: "Cet utilisateur est en privé." });
        }

    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue" });
    }

}


module.exports = {
    postComment,
    getCommentsOfContent
};