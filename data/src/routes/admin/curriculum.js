//// Core modules

//// External modules
const express = require('express')

//// Modules
const flash = require('../../kisapmata')
const middlewares = require('../../middlewares')

// Router
let router = express.Router()

router.use('/admin', middlewares.requireAuthUser) //@TODO: Require admin role 

router.get('/admin/curriculum/all', middlewares.guardRoute(['create_curriculum']), async (req, res, next) => {
    try {
        let rows = await req.app.locals.db.models.Curriculum.findAll({
            where: {}
        });

        let data = {
            rows: rows
        }
        res.render('admin/curriculum/all.html', data);
    } catch (err) {
        next(err);
    }
});

router.get('/admin/curriculum/create', middlewares.guardRoute(['create_curriculum']), async (req, res, next) => {
    try {
        let data = {}
        res.render('admin/curriculum/create.html', data);
    } catch (err) {
        next(err);
    }
});

router.post('/admin/curriculum/create', middlewares.guardRoute(['create_curriculum']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let data = req.body

        let curriculum = await req.app.locals.db.models.Curriculum.create({
            name: data.name,
            code: data.code,
            version: data.version,
            startAt: data.startAt,
            endAt: data.endAt,
            
        });

        flash.ok(req, 'curriculum', 'Curriculum created.')
        res.redirect(`/admin/curriculum/update/`+ curriculum.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/curriculum/update/:curriculumId', middlewares.guardRoute(['update_curriculum']), async (req, res, next) => {
    try {
        let curriculum = await req.app.locals.db.models.Curriculum.findOne({
            where: {
                id: req.params.curriculumId
            }
        });
        if(!curriculum){
            throw new Error('Curriculum not found.')
        }

        let data = {
            curriculum: curriculum
        }
        res.render(`admin/curriculum/update.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/curriculum/update/:curriculumId', middlewares.guardRoute(['update_curriculum']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let curriculum = await req.app.locals.db.models.Curriculum.findOne({
            where: {
                id: req.params.curriculumId
            }
        });
        if(!curriculum){
            throw new Error('Curriculum not found.')
        }

        let data = req.body

        await req.app.locals.db.models.Curriculum.update({ 
            name: data.name,
            code: data.code,
            version: data.version,
            startAt: data.startAt,
            endAt: data.endAt,
            
        }, 
        {
            where: {
                id: curriculum.id
            }
        });

        flash.ok(req, 'curriculum', 'Curriculum updated.')
        res.redirect(`/admin/curriculum/update/`+ curriculum.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/curriculum/delete/:curriculumId', middlewares.guardRoute(['delete_curriculum']), async (req, res, next) => {
    try {
        let curriculum = await req.app.locals.db.models.Curriculum.findOne({
            where: {
                id: req.params.curriculumId
            }
        });
        if(!curriculum){
            throw new Error('Curriculum not found.')
        }

        let data = {
            curriculum: curriculum
        }
        res.render(`admin/curriculum/delete.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/curriculum/delete/:curriculumId', middlewares.guardRoute(['delete_curriculum']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let curriculum = await req.app.locals.db.models.Curriculum.findOne({
            where: {
                id: req.params.curriculumId
            }
        });
        if(!curriculum){
            throw new Error('Curriculum not found.')
        }

        await curriculum.destroy()

        flash.ok(req, 'curriculum', 'Curriculum deleted.')
        res.redirect(`/admin/curriculum/all`)
    } catch (err) {
        next(err);
    }
});

module.exports = router;