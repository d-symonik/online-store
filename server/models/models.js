const sequelize = require('../db');

const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "USER",
    }
});

const Cart = sequelize.define('cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    }
});
const CartDevice = sequelize.define('cart_device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    deviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});

const Device = sequelize.define('device', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});
const DeviceType = sequelize.define('device_type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

});
const DeviceBrand = sequelize.define('device_brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

});
const DeviceInfo = sequelize.define('device_info', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },

});


const TypeBrand = sequelize.define('type_brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
});


User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartDevice);
CartDevice.belongsTo(Cart);

Device.hasMany(CartDevice);
CartDevice.belongsTo(Device);

Device.hasMany(DeviceInfo,{as: "info"});
DeviceInfo.belongsTo(Device);

DeviceType.hasMany(Device);
Device.belongsTo(DeviceType);

DeviceBrand.hasMany(Device);
Device.belongsTo(DeviceBrand);

DeviceType.belongsToMany(DeviceBrand, {through: TypeBrand});
DeviceBrand.belongsToMany(DeviceType, {through: TypeBrand});

module.exports = {
    User,
    Cart,
    CartDevice,
    Device,
    DeviceType,
    DeviceBrand,
    DeviceInfo,
    TypeBrand,
}