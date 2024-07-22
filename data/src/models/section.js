const { DataTypes } = require('sequelize')
const instructorUnit = require('./instructor-unit')

module.exports = (modelName, sequelize) => {
    return sequelize.define(modelName, {
        name: {
            type: DataTypes.STRING, // Section
        },
        courseId: {
            type: DataTypes.INTEGER, // Subject
        },
        instructorId: {
            type: DataTypes.INTEGER, // Instructor
        },
        semester: {
            type: DataTypes.STRING,
        },
        students: {
            type: DataTypes.STRING, // students id ARRAY
        },
        schedules: {
            type: DataTypes.STRING, // Schedules id ARRAY
        },
    }, {
        // Other model options go here
    })
}
