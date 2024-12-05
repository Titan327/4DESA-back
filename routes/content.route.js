const router = require('express').Router();
const ContentController = require('../controllers/content.controller');
const authenticateToken = require('../middlewares/jwt_auth.middleware');
//const check_role = require('../middlewares/check_role.middlewares');
const upload = require('../middlewares/multer.middleware');
const blobController = require('../controllers/blob.controller');


//PUBLIC
//POST /api/content
router.post("/",authenticateToken,ContentController.postContent);
//GET /api/content
router.get("/",authenticateToken,ContentController.getContentOfUser);

router.post('/upload', upload.single('image'), blobController.uploadImage);



module.exports = router;
