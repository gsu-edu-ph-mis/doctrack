//// Core modules

//// External modules
const express = require('express')

//// Modules
const flash = require('../../kisapmata')
const middlewares = require('../../middlewares')

// Router
let router = express.Router()

router.use('/admin', middlewares.requireAuthUser) //@TODO: Require admin role 

router.get('/admin/course/all', middlewares.guardRoute(['create_course']), async (req, res, next) => {
    try {
        let rows = await req.app.locals.db.models.Course.findAll({
            where: {}
        });

        let data = {
            rows: rows
        }
        res.render('admin/course/all.html', data);
    } catch (err) {
        next(err);
    }
});

router.get('/admin/course/create', middlewares.guardRoute(['create_course']), async (req, res, next) => {
    try {
        let data = {}
        res.render('admin/course/create.html', data);
    } catch (err) {
        next(err);
    }
});

router.post('/admin/course/create', middlewares.guardRoute(['create_course']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let data = req.body

        let course = await req.app.locals.db.models.Course.create({
            name: data.name,
            code: data.code,
            number: data.number,
            lectureUnit: data.lectureUnit,
            lectureUnitFee: data.lectureUnitFee,
            labUnit: data.labUnit,
            labUnitFee: data.labUnitFee,
            creditUnit: data.creditUnit,
            creditUnitFee: data.creditUnitFee,
            
        });

        flash.ok(req, 'course', 'Course created.')
        res.redirect(`/admin/course/update/`+ course.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/course/update/:courseId', middlewares.guardRoute(['update_course']), async (req, res, next) => {
    try {
        let course = await req.app.locals.db.models.Course.findOne({
            where: {
                id: req.params.courseId
            }
        });
        if(!course){
            throw new Error('Course not found.')
        }

        let data = {
            course: course
        }
        res.render(`admin/course/update.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/course/update/:courseId', middlewares.guardRoute(['update_course']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let course = await req.app.locals.db.models.Course.findOne({
            where: {
                id: req.params.courseId
            }
        });
        if(!course){
            throw new Error('Course not found.')
        }

        let data = req.body

        await req.app.locals.db.models.Course.update({ 
            name: data.name,
            code: data.code,
            number: data.number,
            lectureUnit: data.lectureUnit,
            lectureUnitFee: data.lectureUnitFee,
            labUnit: data.labUnit,
            labUnitFee: data.labUnitFee,
            creditUnit: data.creditUnit,
            creditUnitFee: data.creditUnitFee,
            
        }, 
        {
            where: {
                id: course.id
            }
        });

        flash.ok(req, 'course', 'Course updated.')
        res.redirect(`/admin/course/update/`+ course.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/course/delete/:courseId', middlewares.guardRoute(['delete_course']), async (req, res, next) => {
    try {
        let course = await req.app.locals.db.models.Course.findOne({
            where: {
                id: req.params.courseId
            }
        });
        if(!course){
            throw new Error('Course not found.')
        }

        let data = {
            course: course
        }
        res.render(`admin/course/delete.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/course/delete/:courseId', middlewares.guardRoute(['delete_course']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let course = await req.app.locals.db.models.Course.findOne({
            where: {
                id: req.params.courseId
            }
        });
        if(!course){
            throw new Error('Course not found.')
        }

        await course.destroy()

        flash.ok(req, 'course', 'Course deleted.')
        res.redirect(`/admin/course/all`)
    } catch (err) {
        next(err);
    }
});

module.exports = router;