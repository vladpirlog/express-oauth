const express = require('express')
const router = express.Router()

/* Logout endpoint. */
router.post('/', function (req, res, next) {
    /**
     * Logout and clear the cookie.
     */
    res.clearCookie('express_oauth')
    return res.redirect('/')
})

module.exports = router
