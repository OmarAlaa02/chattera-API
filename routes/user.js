const router=require('express').Router();
const userController=require('../controllers/user');
const verify = require('../middlewares/jwt_vrify')


router.post('/signup',userController.postSignup);
router.post('/signin',userController.postsignin)
router.get('/users',userController.getuser)
router.get('/chat',userController.getchat)
module.exports=router;
