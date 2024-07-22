const { DataTypes } = require('sequelize')
const { safeParseJSON } = require('../util')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
        studentId: {
            type: DataTypes.INTEGER,
        },
        curriculumId: {
            type: DataTypes.INTEGER,
        },
        major: {
            type: DataTypes.STRING,
        },
        semester: {
            type: DataTypes.STRING, // 23-2
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
