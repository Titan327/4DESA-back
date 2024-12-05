const Comment = require('../models/comment.model');
const {where} = require("sequelize");
const User = require("../models/user.model");
const Content = require("../models/content.model");
require('dotenv').config();

async function postComment(req, res){
    try {

        const { contentId } = req.query;
        const { text } = req.body;

        await Comment.create({
            text: text,
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

        const { contentId,page } = req.query;


        const content = await Content.findOne({
            include: [
                {
                    model: User,
                    attributes: ["public","active"]
                }
            ],
            where: { id: contentId }
        });


        if (!content) {
            return res.status(404).json({ error: "Post introuvable." });
        }

        if (!content.User.active) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        if (content.User.public == 1 || content.userId === req.user.id) {

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
        console.log(error);
        return res.status(500).json({ error: "Une erreur est survenue" });
    }

}

module.exports = {
    postComment,
    getCommentsOfContent
};