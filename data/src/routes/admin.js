//// Core modules

//// External modules
const express = require('express')
const lodash = require('lodash')
const moment = require('moment')

//// Modules
const flash = require('../kisapmata')
const middlewares = require('../middlewares')

// Router
let router = express.Router()

router.use('/admin', middlewares.requireAuthUser) //@TODO: Require admin role 

router.get('/admin', async (req, res, next) => {
    try {
        let data = {
            flash: flash.get(req, 'exam'),
        }
        res.render('admin/home.html', data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;