const ApiError = require("../error/ApiError");
const {Cart, CartDevice} = require("../models/models");

module.exports = {
    add: async (req, res, next) => {
        try {
            const {id} = req.query;
            const user = req.user;

            const userCart = await Cart.findOne({where: {userId: user.id}});
            const cartDevice = await CartDevice.create({
                cartId: userCart.id,
                deviceId: id,

            });
            return res.json(cartDevice);
        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },
    remove: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = req.user;

            const userCart = await Cart.findOne({where: {userId: user.id}});

            const removedDevice = await CartDevice.destroy({where:{
                    cartId: userCart.id,
                    deviceId: id,
                }})
            return res.json({message: `Device successfully delete ${removedDevice}`});
        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },
    getAll: async (req, res, next) => {
        try {
            const user = req.user;
            const userCart = await Cart.findOne({where: {userId: user.id}});

            const cartDevices = await CartDevice.findAll({where: {cartId: userCart.id}});
            return res.json(cartDevices);
        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },

}