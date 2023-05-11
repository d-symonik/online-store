const {Router} = require('express');

const typeController = require('../controllers/typeController');
const roleMiddleware = require("../middlewares/roleMiddleware");
const {UserRoles} = require("../constants/UserRoles");

const router = Router();

router.get('/',typeController.getAll);
router.post('/',roleMiddleware(UserRoles.ADMIN), typeController.create);


module.exports = {typeRouter:router};
