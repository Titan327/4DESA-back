const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
//const authenticateToken = require('../middlewares/jwt_auth.middlewares');
//const check_role = require('../middlewares/check_role.middlewares');

//PUBLIC
//POST /api/auth/register
router.post("/register",AuthController.RegisterUser);
//POST /api/auth/login
router.post("/login",AuthController.LoginUser);

router.get("/azure", AuthController.AzureAuth);
router.get("/azure/callback", AuthController.AzureCallback);
router.get("/failure", AuthController.AuthFailure);

module.exports = router;
