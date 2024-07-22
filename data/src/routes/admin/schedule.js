//// Core modules

//// External modules
const express = require('express')
const moment = require('moment')

//// Modules
const flash = require('../../kisapmata')
const middlewares = require('../../middlewares')

// Router
let router = express.Router()

router.use('/admin', middlewares.requireAuthUser)

router.get('/admin/schedule/all', middlewares.guardRoute(['read_all_schedule']), async (req, res, next) => {
    try {
        let rows = await req.app.locals.db.models.Schedule.findAll({
            where: {}
        });

        let data = {
            rows: rows
        }
        res.render('admin/schedule/all.html', data);
    } catch (err) {
        next(err);
    }
});

router.get('/admin/schedule/create', middlewares.guardRoute(['create_schedule']), async (req, res, next) => {
    try {
        const MINUTES = 1440
        let interval = 30
        let maxTimeSlots = Math.round(MINUTES / interval)

        let timeSlots = []
        let start = moment().startOf('day')
        for (let timeSlotIndex = 0; timeSlotIndex < maxTimeSlots; timeSlotIndex++) {
            let timeSlot = start.format('hh:mm A') + ' - ' + start.add(interval, 'minutes').format('hh:mm A')
            timeSlots.push(timeSlot)
        }

        let times = []

        let data = {
            interval: interval,
            times: times,
            schedSlots: [
                {
                    weekdayNum: 1, // 1-7 Mon-Sun
                    start: 420,
                    end: 570
                },
                {
                    weekdayNum: 1,
                    start: 1035,
                    end: 1080
                },
            ],
            timeSlots: timeSlots,
        }
        // return res.send(data)
        res.render('admin/schedule/create.html', data);
    } catch (err) {
        next(err);
    }
});

router.post('/admin/schedule/create', middlewares.guardRoute(['create_schedule']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let data = req.body

        let schedule = await req.app.locals.db.models.Schedule.create({

        });

        flash.ok(req, 'schedule', 'Schedule created.')
        res.redirect(`/admin/schedule/update/` + schedule.id)
    } catch (err) {
        next(err);
    }
});

router.get('/admin/schedule/update/:scheduleId', middlewares.guardRoute(['update_schedule']), async (req, res, next) => {
    try {
        let schedule = await req.app.locals.db.models.Schedule.findOne({
            where: {
                id: req.params.scheduleId
            }
        });
        if (!schedule) {
            throw new Error('Schedule not found.')
        }

        let data = {
            schedule: schedule
        }
        res.render(`admin/schedule/update.html`, data)
    } catch (err) {
        next(err);
    }
});

router.post('/admin/schedule/update/:scheduleId', middlewares.guardRoute(['update_schedule']), middlewares.antiCsrfCheck, async (req, res, next) => {
    try {
        let schedule = await req.app.locals.db.models.Schedule.findOne({
            where: {
                id: req.params.scheduleId
            }
        });
        if (!schedule) {
            throw new Error('Schedule not found.')
        }

        let data = req.body

        await req.app.locals.db.models.Schedule.update({

        },
            {
                where: {
                    id: schedule.id
                }
            });

        flash.ok(req, 'schedule', 'Schedule updated.')
        res.redirect(`/admin/schedule/update/` + schedule.id)
    } catch (err) {
        next(err);
    }
});

module.exports = router;