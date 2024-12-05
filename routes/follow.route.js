const router = require('express').Router();
const FollowController = require('../controllers/follow.controller');
const authenticateToken = require('../middlewares/jwt_auth.middleware');
//const check_role = require('../middlewares/check_role.middlewares');


//PUBLIC
//POST /api/follow?followerId
router.post("/",authenticateToken,FollowController.follow);
//GET /api/waitingfollower
router.get("/waitingfollower",authenticateToken,FollowController.getAllWaitingFollower);
//PUT /api/waitingfollower?followId
router.put("/accept",authenticateToken,FollowController.acceptFollower);



module.exports = router;
