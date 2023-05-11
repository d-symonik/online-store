const {Router} = require('express');
const {userRouter} = require("./userRouter");
const {typeRouter} = require("./typeRouter");
const {brandRouter} = require("./brandRouter");
const {deviceRouter} = require("./deviceRouter");
const {cartRouter} = require("./cartRouter");

const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.use('/user',userRouter);
router.use('/device',deviceRouter);
router.use('/type',typeRouter);
router.use('/brand',brandRouter);
router.use('/cart',authMiddleware,cartRouter);

module.exports = router;

