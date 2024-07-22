//// Core modules

//// External modules
const express = require('express')

//// Modules
const flash = require('../../kisapmata')
const middlewares = require('../../middlewares')

// Router
let router = express.Router()

router.use('/admin', middlewares.requireAuthUser) //@TODO: Require admin role 

router.get('/admin/college/all', middlewares.guardRoute(['create_college']), async (req, res, next) => {
    try {
        let rows = await req.app.locals.db.models.College.findAll({
            where: {}
        });

        let data = {
            rows: rows
        }
        res.render('admin/college/all.html', data);
    } catch (err) {
        next(err);
    }
});

router.get('/admin/college/create', middlewares.guardRoute(['create_college']), async (req, res, next) => {
    try {
        let data = {}
        res.render('admin/college/create.html', data);
    } catch (err) {
        next(err);
    }
});

router.post('/admin/college/create', middlewares.guardRoute(['create_college']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let data = req.body

        let college = await req.app.locals.db.models.College.create({
            name: data.name,
            code: data.code,
            
        });

        flash.ok(req, 'college', 'College created.')
        res.redirect(`/admin/college/update/`+ college.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/college/update/:collegeId', middlewares.guardRoute(['update_college']), async (req, res, next) => {
    try {
        let college = await req.app.locals.db.models.College.findOne({
            where: {
                id: req.params.collegeId
            }
        });
        if(!college){
            throw new Error('College not found.')
        }

        let data = {
            college: college
        }
        res.render(`admin/college/update.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/college/update/:collegeId', middlewares.guardRoute(['update_college']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let college = await req.app.locals.db.models.College.findOne({
            where: {
                id: req.params.collegeId
            }
        });
        if(!college){
            throw new Error('College not found.')
        }

        let data = req.body

        await req.app.locals.db.models.College.update({ 
            name: data.name,
            code: data.code,
            
        }, 
        {
            where: {
                id: college.id
            }
        });

        flash.ok(req, 'college', 'College updated.')
        res.redirect(`/admin/college/update/`+ college.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/college/delete/:collegeId', middlewares.guardRoute(['delete_college']), async (req, res, next) => {
    try {
        let college = await req.app.locals.db.models.College.findOne({
            where: {
                id: req.params.collegeId
            }
        });
        if(!college){
            throw new Error('College not found.')
        }

        let data = {
            college: college
        }
        res.render(`admin/college/delete.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/college/delete/:collegeId', middlewares.guardRoute(['delete_college']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let college = await req.app.locals.db.models.College.findOne({
            where: {
                id: req.params.collegeId
            }
        });
        if(!college){
            throw new Error('College not found.')
        }

        await college.destroy()

        flash.ok(req, 'college', 'College deleted.')
        res.redirect(`/admin/college/all`)
    } catch (err) {
        next(err);
    }
});

module.exports = router;