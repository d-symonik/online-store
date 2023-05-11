const {Router} = require('express');

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = Router();

router.post('/registration',userController.registration);
router.post('/login',userController.login);
router.get('/auth',authMiddleware,userController.auth);

module.exports = {userRouter:router};
