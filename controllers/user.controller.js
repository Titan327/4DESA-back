const User = require('../models/user.model');
require('dotenv').config();

async function createUser(req, res){
    try {

        // regex 1 minuscule / 1 majuscule / 1 chiffre / 1 charactere spécial
        const regexPswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const data = req.body;

        if (data.name.length > 20){
            return res.status(449).json({ error: "Le nom est trop long." });
        }
        if (data.surname.length > 20){
            return res.status(449).json({ error: "Le prenom est trop long." });
        }
        if (data.email.length > 100){
            return res.status(449).json({ error: "L'email est trop long." });
        }

        if (data.password.length > 20){
            return res.status(449).json({ error: 'Le mot de passe est trop long, il doit faire moin de 20 caractères.' });
        }
        if (data.password.length < 8){
            return res.status(449).json({ error: 'Le mot de passe est trop court, il doit faire au moin 8 caractères.' });
        }
        if (!regexPswd.test(data.password)){
            return res.status(449).json({ error: 'Le mot de passe doit contenir au mois une minuscule, une majuscule, un chiffre et un caractère spécial.' });
        }


        const existing = await User.findOne({
            where: {
                email: data.email,
            },
        });

        if (!existing){

            const pswdHash = await bcrypt.hash(data.password, 10); // une complexité de 10 est suffisante.

            await User.create({
                name: data.name,
                surname: data.surname,
                email: data.email,
                password: pswdHash,
            });

            return res.status(201).json({ success: "Utilisateur créé." });

        }else {

            return res.status(449).json({ error: "Cet email est déjà utilisé." });

        }

    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue" });
    }
}

async function findUserByUsername(req, res) {
    try {

        const { username } = req.body;

        await User.findOne({
            where: {username: username},
            attributes: ["id","username","public"]
        }).then((result) => {
            return res.status(200).json({ success: result });
        }).catch(() => {
            return res.status(500).json({ error: "Une erreur interne au serveur est surenue, veuiller contacter les administrateurs" });
        });

    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue" });
    }
}

async function setPublicParam(req, res){
    try {
        const userId = req.user.id;
        const { public } = req.body;

        await User.update(
            { public: public },
            { where: {id : userId} }
        ).then(() => {
            return res.status(200).json({ success: "Utilisateur modifié" });
        }).catch((error) => {
            return res.status(500).json({ error: "Une erreur interne au serveur est surenue, veuiller contacter les administrateurs" });
        });
    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue" });
    }
}

module.exports = {
    createUser,
    findUserByUsername,
    setPublicParam
};
