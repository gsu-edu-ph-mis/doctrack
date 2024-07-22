const { DataTypes } = require('sequelize')
const { safeParseJSON } = require('../util')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
       
        college: {
            type: DataTypes.STRING,
        },
        instructor: {
            type: DataTypes.STRING,
        },
        academicYear: {
            type: DataTypes.INTEGER, // 2023
        },
        semester: {
            type: DataTypes.STRING, // 2
        },
        classCodes: {
            type: DataTypes.JSON,
            get() {
                const rawValue = this.getDataValue('classCodes');
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
