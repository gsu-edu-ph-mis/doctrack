const { DataTypes } = require('sequelize')
const moment = require('moment')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
        firstName: {
            type: DataTypes.STRING,
        },
        middleName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        suffix: {
            type: DataTypes.STRING,
        },
        gender: {
            type: DataTypes.STRING,
        },
        birthDate: {
            type: DataTypes.DATE,
            get() {
                const rawValue = this.getDataValue('birthDate');
                return moment(rawValue).format('YYYY-MM-DD')
            },
        },
        address: {
            type: DataTypes.STRING,
        },
        addressPermanent: {
            type: DataTypes.STRING,
        }
    }, {
        // Other model options go here
    })
}
