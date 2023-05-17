const {object, string} = require("yup");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require("../error/ApiError");
const {User, Cart} = require('../models/models');
const generateJWT = (id, email, role) => {
    return jwt.sign(
        {
            id,
            email,
            role
        },
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    )
};
module.exports = {
    registration: async (req, res, next) => {
        try {
            const userSchema = object({
                email: string().email().min(8).max(30).required(),
                password: string().min(8).required(),
            });

            let {email, password, role} = req.body;

            await userSchema.validate({email, password});
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequestError('User with this email already exist'))
            }
            const hashPassword = await bcrypt.hash(password, 10);

            const user = await User.create({email, password: hashPassword, role});
            const cart = await Cart.create({userId: user.id});

            const token = generateJWT(user.id, user.email, user.role);

            return res.json({token});

        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },
    login: async (req, res, next) => {
        try {
            const userSchema = object({
                email: string().email().min(8).max(30).required(),
                password: string().min(8).required(),
            });
            const {email, password} = req.body;
            await userSchema.validate({email, password})
            const user = await User.findOne({where: {email}});

            if (!user) {
                return next(ApiError.badRequestError('User with this email not found'));
            }
            let comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) {
                return next(ApiError.badRequestError('Incorrect password'));
            }

            const token = generateJWT(user.id, user.email, user.role);

            return res.json({token});

        } catch (err) {
            return next(ApiError.badRequestError(err.message));
        }
    },
    auth: async (req, res, next) => {
        try {
            const token = generateJWT(req.user.id, req.user.email, req.user.role)
            return res.json({token})
        }
        catch (e) {
            return next(ApiError.badRequestError(e.message));
        }

    },
}