const Content = require('../models/content.model');
const {where} = require("sequelize");
const Follow = require("../models/follow.model");
require('dotenv').config();

async function follow(req, res){
    try {
        const userId = req.user.id;
        const { followUserId } = req.query;

        await Follow.create({
            userId: userId,
            userFollowedId: followUserId
        }).then((result) => {
            return res.status(200).json({ success: result });
        }).catch(() => {
            return res.status(500).json({ error: "Une erreur interne au serveur est surenue, veuiller contacter les administrateurs" });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Une erreur est survenue" });
    }

}

async function getAllWaitingFollower(req, res){
    try {
        const userId = req.user.id;
        const { page } = req.query;

        await Follow.findAll({
            where: {userId: userId,followAccepted: false},
            limit: 10,
            offset:page*10,
        }).then((result) => {
            return res.status(200).json({ success: result });
        }).catch(() => {
            return res.status(500).json({ error: "Une erreur interne au serveur est surenue, veuiller contacter les administrateurs" });
        });

    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue" });
    }
}

async function getAllFollower(req, res){
    try {
        const userId = req.user.id;
        const { page } = req.query;

        await Follow.findAll({
            where: {userId: userId,followAccepted: true},
            limit: 10,
            offset:page*10,
        }).then((result) => {
            return res.status(200).json({ success: result });
        }).catch(() => {
            return res.status(500).json({ error: "Une erreur interne au serveur est surenue, veuiller contacter les administrateurs" });
        });

    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue" });
    }
}

async function acceptFollower(req, res){

    const { followId } = req.query;

    await Follow.update(
        {followAccepted: true},
        {where: {Id : followId}}
    ).then(() => {
        return res.status(200).json({ success: "Follower accepter" });
    }).catch(() => {
        return res.status(500).json({ error: "Une erreur interne au serveur est surenue, veuiller contacter les administrateurs" });
    });

}

async function rejectFollower(req, res){
    const userId = req.user.id;
    const { followerId } = req.query;

    await Follow.destroy(
        {where: {id: userId}}
    ).then(() => {
        return res.status(200).json({success: "Utilisateur supprimé"});
    }).catch(() => {
        return res.status(500).json({error: "Une erreur interne au serveur est surenue, veuiller contacter les administrateurs"});
    });

}



module.exports = {
    follow,
    getAllWaitingFollower,
    acceptFollower,
    getAllFollower
};


