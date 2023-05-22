const {Router} = require('express');
const cartDeviceController = require('../controllers/cartDeviceController');

const router = Router();

router.post('/',cartDeviceController.add);
router.delete('/:id',cartDeviceController.remove);
router.get('/',cartDeviceController.getAll);
router.delete('/',cartDeviceController.removeAll);

module.exports = {cartRouter:router};
