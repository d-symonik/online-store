const ApiError = require('../error/ApiError');
const {DeviceType} = require("../models/models");

module.exports = {
    create: async (req, res, next) => {
        try {
            const {name} = req.body;

            if (!name) {
                return next(ApiError.badRequestError('Incorrect name of type'));
            }
            if (typeof name !== 'string') {
                return next(ApiError.badRequestError('The type name must be a string'));
            }
            if (name.charAt(0) !== name.charAt(0).toUpperCase()) {
                return next(ApiError.badRequestError('The type name must start with a capital letter'));
            }
            if (name.length < 2 && name.length > 30) {
                return next(ApiError.badRequestError('The type name must be between 2 and 30 characters'));
            }

            const type = await DeviceType.create({name});
            return res.json(type);
        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },
    getAll: async (req, res, next) => {
        try {
            const types = await DeviceType.findAll();
            return res.json(types);
        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },
};