const {Router} = require('express');
const brandController = require('../controllers/brandController');
const roleMiddleware = require("../middlewares/roleMiddleware");
const {UserRoles} = require("../constants/UserRoles");

const router = Router();

router.get('/',brandController.getAll);
router.post('/',roleMiddleware(UserRoles.ADMIN),brandController.create);

module.exports = {brandRouter:router};
