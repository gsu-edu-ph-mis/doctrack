//// Core modules

//// External modules
const express = require('express')

//// Modules
const flash = require('../../kisapmata')
const middlewares = require('../../middlewares')

// Router
let router = express.Router()

router.use('/admin', middlewares.requireAuthUser) //@TODO: Require admin role 

router.get('/admin/registration-form/all', middlewares.guardRoute(['create_registrationForm']), async (req, res, next) => {
    try {
        let rows = await req.app.locals.db.models.RegistrationForm.findAll({
            where: {}
        });

        let data = {
            rows: rows
        }
        res.render('admin/registration-form/all.html', data);
    } catch (err) {
        next(err);
    }
});

router.get('/admin/registration-form/create', middlewares.guardRoute(['create_registrationForm']), async (req, res, next) => {
    try {
        let data = {}
        res.render('admin/registration-form/create.html', data);
    } catch (err) {
        next(err);
    }
});

router.post('/admin/registration-form/create', middlewares.guardRoute(['create_registrationForm']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let data = req.body

        let registrationForm = await req.app.locals.db.models.RegistrationForm.create({
            studentId: data.studentId,
            curriculumId: data.curriculumId,
            major: data.major,
            semester: data.semester,
            classCodes: data.classCodes,
            
        });

        flash.ok(req, 'registrationForm', 'Registration Form created.')
        res.redirect(`/admin/registration-form/update/`+ registrationForm.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/registration-form/update/:registrationFormId', middlewares.guardRoute(['update_registrationForm']), async (req, res, next) => {
    try {
        let registrationForm = await req.app.locals.db.models.RegistrationForm.findOne({
            where: {
                id: req.params.registrationFormId
            }
        });
        if(!registrationForm){
            throw new Error('Registration Form not found.')
        }

        let data = {
            registrationForm: registrationForm
        }
        res.render(`admin/registration-form/update.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/registration-form/update/:registrationFormId', middlewares.guardRoute(['update_registrationForm']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let registrationForm = await req.app.locals.db.models.RegistrationForm.findOne({
            where: {
                id: req.params.registrationFormId
            }
        });
        if(!registrationForm){
            throw new Error('Registration Form not found.')
        }

        let data = req.body

        await req.app.locals.db.models.RegistrationForm.update({ 
            studentId: data.studentId,
            curriculumId: data.curriculumId,
            major: data.major,
            semester: data.semester,
            classCodes: data.classCodes,
            
        }, 
        {
            where: {
                id: registrationForm.id
            }
        });

        flash.ok(req, 'registrationForm', 'RegistrationForm updated.')
        res.redirect(`/admin/registration-form/update/`+ registrationForm.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/registration-form/delete/:registrationFormId', middlewares.guardRoute(['delete_registrationForm']), async (req, res, next) => {
    try {
        let registrationForm = await req.app.locals.db.models.RegistrationForm.findOne({
            where: {
                id: req.params.registrationFormId
            }
        });
        if(!registrationForm){
            throw new Error('Registration Form not found.')
        }

        let data = {
            registrationForm: registrationForm
        }
        res.render(`admin/registration-form/delete.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/registration-form/delete/:registrationFormId', middlewares.guardRoute(['delete_registrationForm']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let registrationForm = await req.app.locals.db.models.RegistrationForm.findOne({
            where: {
                id: req.params.registrationFormId
            }
        });
        if(!registrationForm){
            throw new Error('Registration Form not found.')
        }

        await registrationForm.destroy()

        flash.ok(req, 'registrationForm', 'RegistrationForm deleted.')
        res.redirect(`/admin/registration-form/all`)
    } catch (err) {
        next(err);
    }
});

module.exports = router;