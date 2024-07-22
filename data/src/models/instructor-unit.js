const { DataTypes } = require('sequelize')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
        name: {
            type: DataTypes.STRING,
        },
        curriculumId: {
            type: DataTypes.INTEGER,
        },
        semester: {
            type: DataTypes.STRING,
        },
        collegeId: {
            type: DataTypes.INTEGER,
        },
    }, {
        // Other model options go here
    })
}
