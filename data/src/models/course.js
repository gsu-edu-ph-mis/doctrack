const { DataTypes } = require('sequelize')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
        name: {
            type: DataTypes.STRING,
        },
        code: {
            type: DataTypes.STRING,
        },
        number: {
            type: DataTypes.STRING,
        },
        lectureUnit: {
            type: DataTypes.STRING,
        },
        lectureUnitFee: {
            type: DataTypes.STRING,
        },
        labUnit: {
            type: DataTypes.STRING,
        },
        labUnitFee: {
            type: DataTypes.STRING,
        },
        creditUnit: {
            type: DataTypes.STRING,
        },
        creditUnitFee: {
            type: DataTypes.STRING,
        },
    }, {
        // Other model options go here
    })
}
