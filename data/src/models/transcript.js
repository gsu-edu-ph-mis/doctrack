const { DataTypes } = require('sequelize')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
        semester: {
            type: DataTypes.STRING,
        },
        grades: {
            type: DataTypes.JSON,
        },
        studentId: {
            type: DataTypes.NUMBER,
        },
    }, {
        // Other model options go here
    })
}
