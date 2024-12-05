const router = require('express').Router();
const CommentController = require('../controllers/comment.controller');
const authenticateToken = require('../middlewares/jwt_auth.middleware');
//const check_role = require('../middlewares/check_role.middlewares');


//PUBLIC
//POST /api/comment?contentId=1
router.post("/",authenticateToken,CommentController.postComment);
//GET /api/content
router.get("/",authenticateToken,CommentController.getCommentsOfContent);




module.exports = router;
