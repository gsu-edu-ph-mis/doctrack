const { DataTypes } = require('sequelize')
const { safeParseJSON } = require('../util')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
        firstName: {
            type: DataTypes.STRING,
        },
        middleName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        passwordHash: {
            type: DataTypes.STRING
        },
        salt: {
            type: DataTypes.STRING
        },
        roles: {
            type: DataTypes.JSON,
            defaultValue: [],
            get() {
                const rawValue = this.getDataValue('roles');
                if (typeof rawValue === 'string') {
                    return safeParseJSON(rawValue)
                }
                return [];
            },
        },
        active: {
            type: DataTypes.BOOLEAN
        },
    }, {
        // Other model options go here
    })
}