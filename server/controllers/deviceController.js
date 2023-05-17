const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo} = require("../models/models");
const ApiError = require("../error/ApiError");
module.exports = {
    create: async (req, res, next) => {
        try {

            let {name, price, deviceTypeId, deviceBrandId, info} = req.body;
            const {image} = req.files;

            const candidate = await Device.findOne({where: {name}});
            if (candidate) {
                return next(ApiError.badRequestError('Device with this name already exist'));
            }
            if (typeof name !== 'string' || name.trim().length === 0) {
                return next(ApiError.badRequestError('Incorrect input name format'));
            }
            if (typeof +price !== 'number' || isNaN(price) || price <= 0) {
                return next(ApiError.badRequestError('Incorrect input price format '));
            }
            let fileName = uuid.v4() + '.jpg';
            await image.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await Device.create({name, price, image: fileName, deviceTypeId, deviceBrandId});

            if (info) {
                info = JSON.parse(info);
                info.forEach(item => {
                    DeviceInfo.create({
                        title: item.title,
                        description: item.description,
                        deviceId: device.id,

                    })
                })

            }
            return res.json(device);
        } catch (e) {
            return next(ApiError.badRequestError(e.message))
        }
    },
    getAll: async (req, res, next) => {
        try {
            let {brandId, typeId, price, limit, page} = req.query;

            if (brandId) {
                brandId = JSON.parse(brandId)
            }
            if (typeId) {
                typeId = JSON.parse(typeId)
            }
            page = page || 1;
            limit = limit || 12;

            let offset = page * limit - limit;

            let filter = {
                ...(brandId && {deviceBrandId: brandId}),
                ...(typeId && {deviceTypeId: typeId}),
                ...(price && {price: price})
            };
            let devices = await Device.findAndCountAll({where: filter, limit, offset});
            return res.json(devices);
        } catch (e) {
            return next(ApiError.badRequestError(e.message))
        }
    },
    getById: async (req, res, next) => {
        try {
            const {id} = req.params;
            const device = await Device.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: DeviceInfo,
                        as: 'info'
                    }
                ]
            });
            if (!device) {
                return next(ApiError.badRequestError('Not found with this id'));
            }
            return res.json(device);
        } catch (e) {
            return next(ApiError.badRequestError(e.message))
        }
    },
}