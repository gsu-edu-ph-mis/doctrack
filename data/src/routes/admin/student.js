//// Core modules

//// External modules
const express = require('express')

//// Modules
const flash = require('../../kisapmata')
const middlewares = require('../../middlewares')

// Router
let router = express.Router()

router.use('/admin', middlewares.requireAuthUser) //@TODO: Require admin role 

router.get('/admin/student/all', middlewares.guardRoute(['create_student']), async (req, res, next) => {
    try {
        let rows = await req.app.locals.db.models.Student.findAll({
            where: {}
        });

        let data = {
            rows: rows
        }
        res.render('admin/student/all.html', data);
    } catch (err) {
        next(err);
    }
});

router.get('/admin/student/create', middlewares.guardRoute(['create_student']), async (req, res, next) => {
    try {
        let data = {}
        res.render('admin/student/create.html', data);
    } catch (err) {
        next(err);
    }
});

router.post('/admin/student/create', middlewares.guardRoute(['create_student']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let data = req.body

        let student = await req.app.locals.db.models.Student.create({
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            suffix: data.suffix,
            gender: data.gender,
            birthDate: data.birthDate,
            address: data.address,
            addressPermanent: data.addressPermanent,
            
        });

        flash.ok(req, 'student', 'Student created.')
        res.redirect(`/admin/student/update/`+ student.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/student/update/:studentId', middlewares.guardRoute(['update_student']), async (req, res, next) => {
    try {
        let student = await req.app.locals.db.models.Student.findOne({
            where: {
                id: req.params.studentId
            }
        });
        if(!student){
            throw new Error('Student not found.')
        }

        let data = {
            student: student
        }
        res.render(`admin/student/update.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/student/update/:studentId', middlewares.guardRoute(['update_student']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let student = await req.app.locals.db.models.Student.findOne({
            where: {
                id: req.params.studentId
            }
        });
        if(!student){
            throw new Error('Student not found.')
        }

        let data = req.body

        await req.app.locals.db.models.Student.update({ 
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            suffix: data.suffix,
            gender: data.gender,
            birthDate: data.birthDate,
            address: data.address,
            addressPermanent: data.addressPermanent,
            
        }, 
        {
            where: {
                id: student.id
            }
        });

        flash.ok(req, 'student', 'Student updated.')
        res.redirect(`/admin/student/update/`+ student.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/student/delete/:studentId', middlewares.guardRoute(['delete_student']), async (req, res, next) => {
    try {
        let student = await req.app.locals.db.models.Student.findOne({
            where: {
                id: req.params.studentId
            }
        });
        if(!student){
            throw new Error('Student not found.')
        }

        let data = {
            student: student
        }
        res.render(`admin/student/delete.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/student/delete/:studentId', middlewares.guardRoute(['delete_student']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let student = await req.app.locals.db.models.Student.findOne({
            where: {
                id: req.params.studentId
            }
        });
        if(!student){
            throw new Error('Student not found.')
        }

        await student.destroy()

        flash.ok(req, 'student', 'Student deleted.')
        res.redirect(`/admin/student/all`)
    } catch (err) {
        next(err);
    }
});

module.exports = router;