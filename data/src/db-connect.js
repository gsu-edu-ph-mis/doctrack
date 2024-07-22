//// Core modules

//// External modules
const { Sequelize } = require('sequelize')
const moment = require('moment');

module.exports = {
    connect: async () => {
        try {

            // const sequelize = new Sequelize({
            //     dialect: 'sqlite',
            //     storage: CONFIG.sqlite.db,
            //     logging: false,
            // });

            const sequelize = new Sequelize({
                database: 'doctrack', 
                username: 'root', 
                password: '', 
                host: 'localhost',
                dialect: 'mysql',  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
                logging: false,
            });

            await sequelize.authenticate()
            console.log(`${moment().format('YYYY-MMM-DD hh:mm:ss A')}: Database connected.`);

            return sequelize
        } catch (error) {
            if(ENV === 'dev'){
                console.error( error)
            }
            throw new Error('Connection error.')
        }
    },
    attachModels: async (sequelize) => {
        try {
            return {
                College: require('./models/college')('College', sequelize),
                Course: require('./models/course')('Course', sequelize),
                Curriculum: require('./models/curriculum')('Curriculum', sequelize),
                Instructor: require('./models/instructor')('Instructor', sequelize),
                Permission: require('./models/permission')('Permission', sequelize),
                Role: require('./models/role')('Role', sequelize),
                RegistrationForm: require('./models/registration-form')('RegistrationForm', sequelize),
                Room: require('./models/room')('Room', sequelize),
                Schedule: require('./models/schedule')('Schedule', sequelize),
                Section: require('./models/section')('Section', sequelize),
                Student: require('./models/student')('Student', sequelize),
                User: require('./models/user')('User', sequelize),
            }
        } catch (error) {
            console.log('Connection error:', error.message)
        }
    }
}