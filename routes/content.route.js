const router = require('express').Router();
const ContentController = require('../controllers/content.controller');
const authenticateToken = require('../middlewares/jwt_auth.middleware');
//const check_role = require('../middlewares/check_role.middlewares');


//PUBLIC
//POST /api/content
router.post("/",authenticateToken,ContentController.postContent);




module.exports = router;
