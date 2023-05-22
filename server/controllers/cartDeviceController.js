const ApiError = require("../error/ApiError");
const {Cart, CartDevice, Device} = require("../models/models");
const {login} = require("./userController");

module.exports = {
    add: async (req, res, next) => {
        try {
            const {deviceId} = req.body;
            const user = req.user;

            const userCart = await Cart.findOne({where: {userId: user.id}});
            const cartDevice = await CartDevice.create({
                cartId: userCart.id,
                deviceId: deviceId,

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

            const removedDevice = await CartDevice.destroy({
                where: {
                    id,
                    cartId: userCart.id,
                }
            })
            return res.json({message: `Device successfully delete ${removedDevice}`});
        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },
    getAll: async (req, res, next) => {
        try {
            const user = req.user;
            const userCart = await Cart.findOne({where: {userId: user.id}});

            const cartDevices = await CartDevice.findAll({
                where: {cartId: userCart.id},
                include: [{model: Device, as: 'device'}]
            });
            return res.json(cartDevices);
        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },
    removeAll:async (req, res, next) => {
        try {
            const user = req.user;

            const userCart = await Cart.findOne({where: {userId: user.id}});

            const removedDevice = await CartDevice.destroy({
                where: {
                    cartId: userCart.id,
                }
            })
            return res.json({message: `Device successfully delete ${removedDevice}`});
        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },

}