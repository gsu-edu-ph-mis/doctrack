//// Core modules

//// External modules
const express = require('express')

//// Modules
const flash = require('../../kisapmata')
const middlewares = require('../../middlewares')

// Router
let router = express.Router()

router.use('/admin', middlewares.requireAuthUser) //@TODO: Require admin role 

router.get('/admin/instructor/all', middlewares.guardRoute(['create_instructor']), async (req, res, next) => {
    try {
        let rows = await req.app.locals.db.models.Instructor.findAll({
            where: {}
        });

        let data = {
            rows: rows
        }
        res.render('admin/instructor/all.html', data);
    } catch (err) {
        next(err);
    }
});

router.get('/admin/instructor/create', middlewares.guardRoute(['create_instructor']), async (req, res, next) => {
    try {
        let data = {}
        res.render('admin/instructor/create.html', data);
    } catch (err) {
        next(err);
    }
});

router.post('/admin/instructor/create', middlewares.guardRoute(['create_instructor']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let data = req.body

        let instructor = await req.app.locals.db.models.Instructor.create({
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            suffix: data.suffix,
            gender: data.gender,
            birthDate: data.birthDate,
            address: data.address,
            addressPermanent: data.addressPermanent,
            
        });

        flash.ok(req, 'instructor', 'Instructor created.')
        res.redirect(`/admin/instructor/update/`+ instructor.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/instructor/update/:instructorId', middlewares.guardRoute(['update_instructor']), async (req, res, next) => {
    try {
        let instructor = await req.app.locals.db.models.Instructor.findOne({
            where: {
                id: req.params.instructorId
            }
        });
        if(!instructor){
            throw new Error('Instructor not found.')
        }

        let data = {
            instructor: instructor
        }
        res.render(`admin/instructor/update.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/instructor/update/:instructorId', middlewares.guardRoute(['update_instructor']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let instructor = await req.app.locals.db.models.Instructor.findOne({
            where: {
                id: req.params.instructorId
            }
        });
        if(!instructor){
            throw new Error('Instructor not found.')
        }

        let data = req.body

        await req.app.locals.db.models.Instructor.update({ 
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
                id: instructor.id
            }
        });

        flash.ok(req, 'instructor', 'Instructor updated.')
        res.redirect(`/admin/instructor/update/`+ instructor.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/instructor/delete/:instructorId', middlewares.guardRoute(['delete_instructor']), async (req, res, next) => {
    try {
        let instructor = await req.app.locals.db.models.Instructor.findOne({
            where: {
                id: req.params.instructorId
            }
        });
        if(!instructor){
            throw new Error('Instructor not found.')
        }

        let data = {
            instructor: instructor
        }
        res.render(`admin/instructor/delete.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/instructor/delete/:instructorId', middlewares.guardRoute(['delete_instructor']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let instructor = await req.app.locals.db.models.Instructor.findOne({
            where: {
                id: req.params.instructorId
            }
        });
        if(!instructor){
            throw new Error('Instructor not found.')
        }

        await instructor.destroy()

        flash.ok(req, 'instructor', 'Instructor deleted.')
        res.redirect(`/admin/instructor/all`)
    } catch (err) {
        next(err);
    }
});

module.exports = router;