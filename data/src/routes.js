//// Core modules

//// External modules
const express = require('express');

//// Modules

// Routes
let router = express.Router();
router.use(require('./routes/public'));
router.use(require('./routes/protected'));
router.use(require('./routes/admin'));
router.use(require('./routes/admin/college'));
router.use(require('./routes/admin/course'));
router.use(require('./routes/admin/curriculum'));
router.use(require('./routes/admin/instructor'));
router.use(require('./routes/admin/registration-form'));
router.use(require('./routes/admin/room'));
router.use(require('./routes/admin/schedule'));
router.use(require('./routes/admin/section'));
router.use(require('./routes/admin/student'));
router.use(require('./routes/viewer'));

// 404 Page
router.use((req, res) => {
    res.status(404)
    if (req.xhr || /^\/api\//.test(req.originalUrl)) {
        return res.send("Page not found.")
    }
    res.render('error.html', { error: "Page not found." });
});


module.exports = router;