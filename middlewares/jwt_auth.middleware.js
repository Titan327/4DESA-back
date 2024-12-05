const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).json({ message: "Vous n'etes pas autorisé a acceder a ceci" });
    }

    if(authHeader.split(' ').length !== 2){
        return res.status(401).json({ message: "Vous n'etes pas autorisé a acceder a ceci" });
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer.toLowerCase() !== 'bearer') {
        return res.status(401).json({ message: 'Format d\'en-tête invalide' });
    }

    if (!token) {
        return res.status(401).json({ message: "Vous n'etes pas autorisé a acceder a ceci" });
    }


    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Acces refusé' });
        }

        const sevenDaysInSeconds = 7 * 24 * 60 * 60; // 7 jours en secondes

        const now = Math.floor(Date.now() / 1000); //iat en s donc now en s et pas en ms
        const tokenIssuedAt = user.iat;

        if (now - tokenIssuedAt > sevenDaysInSeconds) {
            return res.status(401).json({ message: 'Token expiré' });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
