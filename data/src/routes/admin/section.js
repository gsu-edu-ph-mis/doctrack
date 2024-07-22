//// Core modules

//// External modules
const express = require('express')

//// Modules
const flash = require('../../kisapmata')
const middlewares = require('../../middlewares')

// Router
let router = express.Router()

router.use('/admin', middlewares.requireAuthUser) //@TODO: Require admin role 

router.get('/admin/section/all', middlewares.guardRoute(['create_section']), async (req, res, next) => {
    try {
        let rows = await req.app.locals.db.models.Section.findAll({
            where: {}
        });

        let data = {
            rows: rows
        }
        res.render('admin/section/all.html', data);
    } catch (err) {
        next(err);
    }
});

router.get('/admin/section/create', middlewares.guardRoute(['create_section']), async (req, res, next) => {
    try {
        let data = {}
        res.render('admin/section/create.html', data);
    } catch (err) {
        next(err);
    }
});

router.post('/admin/section/create', middlewares.guardRoute(['create_section']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let data = req.body

        let section = await req.app.locals.db.models.Section.create({
            name: data.name,
            courseId: data.courseId,
            instructorId: data.instructorId,
            semester: data.semester,
            students: data.students,
            schedules: data.schedules,
            
        });

        flash.ok(req, 'section', 'Section created.')
        res.redirect(`/admin/section/update/`+ section.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/section/update/:sectionId', middlewares.guardRoute(['update_section']), async (req, res, next) => {
    try {
        let section = await req.app.locals.db.models.Section.findOne({
            where: {
                id: req.params.sectionId
            }
        });
        if(!section){
            throw new Error('Section not found.')
        }

        let data = {
            section: section
        }
        res.render(`admin/section/update.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/section/update/:sectionId', middlewares.guardRoute(['update_section']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let section = await req.app.locals.db.models.Section.findOne({
            where: {
                id: req.params.sectionId
            }
        });
        if(!section){
            throw new Error('Section not found.')
        }

        let data = req.body

        await req.app.locals.db.models.Section.update({ 
            name: data.name,
            courseId: data.courseId,
            instructorId: data.instructorId,
            semester: data.semester,
            students: data.students,
            schedules: data.schedules,
            
        }, 
        {
            where: {
                id: section.id
            }
        });

        flash.ok(req, 'section', 'Section updated.')
        res.redirect(`/admin/section/update/`+ section.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/section/delete/:sectionId', middlewares.guardRoute(['delete_section']), async (req, res, next) => {
    try {
        let section = await req.app.locals.db.models.Section.findOne({
            where: {
                id: req.params.sectionId
            }
        });
        if(!section){
            throw new Error('Section not found.')
        }

        let data = {
            section: section
        }
        res.render(`admin/section/delete.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/section/delete/:sectionId', middlewares.guardRoute(['delete_section']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let section = await req.app.locals.db.models.Section.findOne({
            where: {
                id: req.params.sectionId
            }
        });
        if(!section){
            throw new Error('Section not found.')
        }

        await section.destroy()

        flash.ok(req, 'section', 'Section deleted.')
        res.redirect(`/admin/section/all`)
    } catch (err) {
        next(err);
    }
});

module.exports = router;