/**
 * Usage: node scripts/install-colleges.js
 */
//// Core modules
const fs = require('fs');
const path = require('path');

//// External modules
const lodash = require('lodash');
const pigura = require('pigura');

//// Modules


//// First things first
//// Save full path of our root app directory and load config and credentials
global.APP_DIR = path.resolve(__dirname + '/../').replace(/\\/g, '/'); // Turn back slash to slash for cross-platform compat
global.ENV = lodash.get(process, 'env.NODE_ENV', 'dev')

const configLoader = new pigura.ConfigLoader({
    configName: './configs/config.json',
    appDir: APP_DIR,
    env: ENV,
    logging: true
})
global.CONFIG = configLoader.getConfig()

const credLoader = new pigura.ConfigLoader({
    configName: './credentials/credentials.json',
    appDir: APP_DIR,
    env: ENV,
    logging: true
})
global.CRED = credLoader.getConfig()

const dbConn = require('../data/src/db-connect');


; (async () => {
    let dbInstance = await dbConn.connect()

    try {
        console.log('Clearing colleges...')
        let COLLEGES = require('./install-data/colleges-list'); // Do not remove semi-colon
        let College = require('../data/src/models/college')('College', dbInstance)
        await College.drop()
        await College.sync()

        // let logs = []
        // let csvRows = ['"username", "password"']
        for (let x = 0; x < COLLEGES.length; x++) {
            await College.create({
                ...COLLEGES[x]
            })
        }

        console.log(`Inserted ${COLLEGES.length} college(s).`)

    } catch (err) {
        console.error(err)
    } finally {
        dbInstance.close();
    }
})()