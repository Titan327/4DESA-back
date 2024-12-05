const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
//const authenticateToken = require('../middlewares/jwt_auth.middlewares');
//const check_role = require('../middlewares/check_role.middlewares');

//PUBLIC
//POST /api/auth/register
router.post("/register",AuthController.RegisterUser);
//POST /api/auth/login
router.post("/login",AuthController.LoginUser);

router.get("/auth/azure", AuthController.AzureAuth);
router.get("/auth/azure/callback", AuthController.AzureCallback);
router.get("/auth/failure", AuthController.AuthFailure);

module.exports = router;
