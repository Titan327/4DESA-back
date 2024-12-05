const router = require('express').Router();
const UserController = require('../controllers/user.controller');
//const authenticateToken = require('../middlewares/jwt_auth.middleware');
//const check_role = require('../middlewares/check_role.middleware');


//PUBLIC
//GET http://localhost:9000/api/user/
router.get("/",UserController.GetAllUsers);
//POST http://localhost:9000/api/user/
router.post("/",UserController.CreateUser);


module.exports = router;
