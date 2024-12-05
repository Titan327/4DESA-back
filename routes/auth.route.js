const router = require('express').Router();
const UserController = require('../controllers/auth.controller');
//const authenticateToken = require('../middlewares/jwt_auth.middleware');
//const check_role = require('../middlewares/check_role.middleware');

//PUBLIC
//POST http://localhost:9000/api/auth/register
router.post("/register",UserController.RegisterUser);
//POST http://localhost:9000/api/auth/login
router.post("/login",UserController.LoginUser);

module.exports = router;
