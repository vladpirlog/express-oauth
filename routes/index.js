const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    /**
     * Render the homepage. If the user already has the 'express_oauth' cookie set,
     * then the email and profile pic will be displayed.
     */
    return res.render('index', { title: 'Express OAuth 2.0' })
})

module.exports = router
