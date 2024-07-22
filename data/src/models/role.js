const { DataTypes } = require('sequelize')
const { safeParseJSON } = require('../util')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
        key: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        permissions: {
            type: DataTypes.JSON,
            get() {
                const rawValue = this.getDataValue('permissions');
                if (typeof rawValue === 'string') {
                    return safeParseJSON(rawValue)
                }
                return [];
            },
        }
    }, {
        // Other model options go here
    })
}
