const ApiError = require("../error/ApiError");
const {DeviceBrand} = require("../models/models");

module.exports = {
    create: async (req, res, next) => {
        try {
            const {name} = req.body;
            if (!name) {
                return next(ApiError.badRequestError('Incorrect name of brand'));
            }
            if (typeof name !== 'string') {
                return next(ApiError.badRequestError('The brand name must be a string'));
            }
            if (name.charAt(0) !== name.charAt(0).toUpperCase()) {
                return next(ApiError.badRequestError('The brand name must start with a capital letter'));
            }
            if (name.length < 2 && name.length > 30) {
                return next(ApiError.badRequestError('The name must be between 2 and 30 characters'));
            }


            const brand = await DeviceBrand.create({name});
            return res.json(brand);
        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },
    getAll: async (req, res, next) => {
        try {
            const brands = await DeviceBrand.findAll();
            return res.json(brands);
        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },
};