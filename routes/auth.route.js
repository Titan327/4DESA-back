const router = require('express').Router();
const UserController = require('../controllers/auth.controller');
//const authenticateToken = require('../middlewares/jwt_auth.middlewares');
//const check_role = require('../middlewares/check_role.middlewares');

//PUBLIC
//POST /api/auth/register
router.post("/register",UserController.RegisterUser);
//POST /api/auth/login
router.post("/login",UserController.LoginUser);

module.exports = router;
