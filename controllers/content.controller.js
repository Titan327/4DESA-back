const Content = require('../models/content.model');
const {where} = require("sequelize");
const User = require("../models/user.model");
const Follow = require("../models/follow.model");
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


async function getContentOfUser(req, res){
    try {

        const { userId,page } = req.query;

        const user = await User.findOne({
            where: { id: userId },
            attributes: ["public"],
        });

        const follow = await Follow.findOne({
            where: { userId: userId, userFollowedId: req.user.id, followAccepter: true },
        })

        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
        }

        if (!follow){
            return res.status(401).json({ message: "Cet utilisateur est en privé." });
        }

        if (user.public == 1 || userId == req.user.id) {
            await Content.findAll({
                where: {userId: userId},
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
    postContent,
    getContentOfUser
};