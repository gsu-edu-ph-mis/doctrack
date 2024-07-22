//// Core modules

//// External modules
const express = require('express')
const lodash = require('lodash')

//// Core modules

//// Modules
const middlewares = require('../middlewares');
// const s3 = require('../aws-s3');

// Router
let router = express.Router()

// View s3 object using html page
router.get('/file-viewer/:bucket/:prefix/:key', middlewares.requireAuthUser, async (req, res, next) => {
    try {
        let bucket = lodash.get(req, "params.bucket", "");
        let prefix = lodash.get(req, "params.prefix", "");
        let key = lodash.get(req, "params.key", "");

        let url = s3.getSignedUrl('getObject', {
            Bucket: bucket,
            Key: prefix + '/' + key
        })

        res.render('file-viewer.html', {
            url: url,
        });
    } catch (err) {
        next(err);
    }
});

// Get s3 object content
router.get('/file-getter/:bucket/:prefix/:key', async (req, res, next) => {
    try {
        let bucket = lodash.get(req, "params.bucket", "");
        let prefix = lodash.get(req, "params.prefix", "");
        let key = lodash.get(req, "params.key", "");

        let url = s3.getSignedUrl('getObject', {
            Bucket: bucket,
            Key: prefix + '/' + key,
        })

        res.redirect(url);
    } catch (err) {
        next(err);
    }
});

router.get('/student', middlewares.requireAuthUser, async (req, res, next) => {
    try {
        let search = lodash.get(req, 'query.s', '');
        search = new RegExp(search, 'i')
       
        let rows = await req.app.locals.db.models.Student.findAll({
            where: {}
        });

        rows = rows.filter(row => search.test(row.firstName) || search.test(row.middleName) || search.test(row.lastName))
        rows = rows.map(row => {
            return {
                id: row.id,
                name: `${row.firstName} ${row.middleName} ${row.lastName}`,
            }
        })
        return res.send(rows)

    } catch (err) {
        next(err);
    }
});

router.get('/curriculums', middlewares.requireAuthUser, async (req, res, next) => {
    try {
        let search = lodash.get(req, 'query.s', '');
        search = new RegExp(search, 'i')
       
        let rows = await req.app.locals.db.models.Curriculum.findAll({
            where: {}
        });

        rows = rows.filter(row => search.test(row.name))
        return res.send(rows)

    } catch (err) {
        next(err);
    }
});

module.exports = router;