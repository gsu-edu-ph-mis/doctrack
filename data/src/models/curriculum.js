const { DataTypes } = require('sequelize')
const moment = require('moment')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
        name: {
            type: DataTypes.STRING,
        },
        code: {
            type: DataTypes.STRING,
        },
        version: {
            type: DataTypes.STRING,
        },
        startAt: {
            type: DataTypes.DATE,
            get() {
                const rawValue = this.getDataValue('startAt');
                return moment(rawValue).format('YYYY-MM-DD')
            },
        },
        endAt: {
            type: DataTypes.DATE,
            get() {
                const rawValue = this.getDataValue('startAt');
                return moment(rawValue).format('YYYY-MM-DD')
            },
        },
    }, {
        // Other model options go here
    })
}
