//// Core modules

//// External modules
const express = require('express')

//// Modules
const flash = require('../../kisapmata')
const middlewares = require('../../middlewares')

// Router
let router = express.Router()

router.use('/admin', middlewares.requireAuthUser) //@TODO: Require admin role 

router.get('/admin/room/all', middlewares.guardRoute(['create_room']), async (req, res, next) => {
    try {
        let rows = await req.app.locals.db.models.Room.findAll({
            where: {}
        });

        let data = {
            rows: rows
        }
        res.render('admin/room/all.html', data);
    } catch (err) {
        next(err);
    }
});

router.get('/admin/room/create', middlewares.guardRoute(['create_room']), async (req, res, next) => {
    try {
        let data = {}
        res.render('admin/room/create.html', data);
    } catch (err) {
        next(err);
    }
});

router.post('/admin/room/create', middlewares.guardRoute(['create_room']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let data = req.body

        let room = await req.app.locals.db.models.Room.create({
            name: data.name,
            code: data.code,
            
        });

        flash.ok(req, 'room', 'Room created.')
        res.redirect(`/admin/room/update/`+ room.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/room/update/:roomId', middlewares.guardRoute(['update_room']), async (req, res, next) => {
    try {
        let room = await req.app.locals.db.models.Room.findOne({
            where: {
                id: req.params.roomId
            }
        });
        if(!room){
            throw new Error('Room not found.')
        }

        let data = {
            room: room
        }
        res.render(`admin/room/update.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/room/update/:roomId', middlewares.guardRoute(['update_room']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let room = await req.app.locals.db.models.Room.findOne({
            where: {
                id: req.params.roomId
            }
        });
        if(!room){
            throw new Error('Room not found.')
        }

        let data = req.body

        await req.app.locals.db.models.Room.update({ 
            name: data.name,
            code: data.code,
            
        }, 
        {
            where: {
                id: room.id
            }
        });

        flash.ok(req, 'room', 'Room updated.')
        res.redirect(`/admin/room/update/`+ room.id )
    } catch (err) {
        next(err);
    }
});

router.get('/admin/room/delete/:roomId', middlewares.guardRoute(['delete_room']), async (req, res, next) => {
    try {
        let room = await req.app.locals.db.models.Room.findOne({
            where: {
                id: req.params.roomId
            }
        });
        if(!room){
            throw new Error('Room not found.')
        }

        let data = {
            room: room
        }
        res.render(`admin/room/delete.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/room/delete/:roomId', middlewares.guardRoute(['delete_room']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let room = await req.app.locals.db.models.Room.findOne({
            where: {
                id: req.params.roomId
            }
        });
        if(!room){
            throw new Error('Room not found.')
        }

        await room.destroy()

        flash.ok(req, 'room', 'Room deleted.')
        res.redirect(`/admin/room/all`)
    } catch (err) {
        next(err);
    }
});

module.exports = router;