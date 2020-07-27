const express = require('express')
const querystring = require('querystring')
const axios = require('axios')
const getEndpoints = require('../utils/getEndpoints')
const createJWT = require('../utils/createJWT')
const router = express.Router()

/* GET the Google OAuth 2.0 redirect page. */
router.get('/google', async (req, res, next) => {
    try {
        /**
         * If the user has already granted access, then redirect to the homepage.
         */
        if (res.locals.user) { return res.redirect('/') }

        /**
         * Get the authorization code given by Google as a query param.
         */
        const { code: authorizationCode } = req.query

        /**
         * Check if the authorization code exists.
         */
        if (!authorizationCode) {
            return next(new Error('No authorization code provided in query.'))
        }

        /**
         * Use the Google API as the source of truth for the OAuth endpoints.
         * Read more at https://developers.google.com/identity/protocols/oauth2/openid-connect#discovery
         */
        const endpoints = await getEndpoints.google()

        /**
         * Query params needed for getting the access and refresh tokens.
         */
        const authCodeData = querystring.stringify({
            code: authorizationCode,
            redirect_uri: endpoints.redirectURI,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            grant_type: 'authorization_code',
            scope: ''
        })

        /**
         * Request the tokens using the authorization code.
         * The request is made to the Google's authorization server.
         */
        const response1 = await axios.post(endpoints.token, authCodeData)

        /**
         * Request the user info granted by the access_token.
         * The request is made to the Google's resource server.
         */
        const response2 = await axios.post(endpoints.userInfo, null, {
            headers: { Authorization: `Bearer ${response1.data.access_token}` }
        })

        /**
         * Set a JWT cookie for a year. It stores the type of login, the user email
         * and the profile pic URL.
         */
        res.cookie('express_oauth', createJWT('google', response2.data), {
            expires: new Date(Date.now() + 31536000000),
            httpOnly: true
        })

        /**
         * Redirect to the homepage.
         */
        return res.redirect('/')
    } catch (err) { return next(err) }
})

router.get('/github', async (req, res, next) => {
    try {
        /**
         * If the user has already granted access, then redirect to the homepage.
         */
        if (res.locals.user) { return res.redirect('/') }

        /**
         * Get the authorization code given by Github as a query param.
         */
        const { code: authorizationCode } = req.query

        /**
         * Check if the authorization code exists.
         */
        if (!authorizationCode) {
            return next(new Error('No authorization code provided in query.'))
        }

        /**
         * Get the GitHub endpoints.
         */
        const endpoints = getEndpoints.github()

        /**
         * Query params needed for getting the access token.
         */
        const authCodeData = querystring.stringify({
            code: authorizationCode,
            redirect_uri: endpoints.redirectURI,
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET
        })

        /**
         * Request the tokens using the authorization code.
         * The request is made to the Github's authorization server.
         */
        const response1 = await axios.post(endpoints.token, authCodeData, {
            headers: { Accept: 'application/json' }
        })

        /**
         * Request the user info granted by the access_token.
         * The request is made to the Github's resource server.
         */
        const response2 = await axios.get(endpoints.userInfo, {
            headers: { Authorization: `token ${response1.data.access_token}` }
        })

        /**
         * Set a JWT cookie for a year. It stores the type of login, the user email
         * and the profile pic URL.
         */
        res.cookie('express_oauth', createJWT('github', response2.data), {
            expires: new Date(Date.now() + 31536000000),
            httpOnly: true
        })

        /**
         * Redirect to the homepage.
         */
        return res.redirect('/')
    } catch (err) { return next(err) }
})

router.get('/facebook', async (req, res, next) => {
    try {
        /**
         * If the user has already granted access, then redirect to the homepage.
         */
        if (res.locals.user) { return res.redirect('/') }

        /**
         * Get the authorization code given by Facebook as a query param.
         */
        const { code: authorizationCode } = req.query

        /**
         * Check if the authorization code exists.
         */
        if (!authorizationCode) {
            return next(new Error('No authorization code provided in query.'))
        }

        /**
         * Get the Facebook endpoints.
         */
        const endpoints = getEndpoints.facebook()

        /**
         * Query params needed for getting the access token.
         */
        const authCodeData = querystring.stringify({
            code: authorizationCode,
            redirect_uri: endpoints.redirectURI,
            client_id: process.env.FACEBOOK_CLIENT_ID,
            client_secret: process.env.FACEBOOK_CLIENT_SECRET
        })

        /**
         * Request the tokens using the authorization code.
         * The request is made to the Facebook's authorization server.
         */
        const response1 = await axios.get(endpoints.token + '?' + authCodeData)

        /**
         * Query params needed for getting the user's info.
         */
        const accessTokenData = querystring.stringify({
            fields: 'email,first_name,last_name',
            access_token: response1.data.access_token
        })

        /**
         * Request the user info granted by the access_token.
         * The request is made to the Facebook's resource server.
         */
        const response2 = await axios.get(endpoints.userInfo + '?' + accessTokenData)

        /**
         * Query params needed for getting the user's profile picture.
         */
        const profilePictureData = querystring.stringify({
            fields: 'picture.type(large)',
            access_token: response1.data.access_token
        })

        /**
         * Request the user profile picture granted by the access_token.
         * The request is made to the Facebook's resource server.
         */
        const response3 = await axios.get(endpoints.userProfilePicture + response2.data.id + '?' + profilePictureData)

        /**
         * Set a JWT cookie for a year. It stores the type of login, the user email
         * and the profile pic URL.
         */
        res.cookie('express_oauth', createJWT('facebook', {
            email: response2.data.email,
            profileImage: response3.data.picture.data.url
        }), {
            expires: new Date(Date.now() + 31536000000),
            httpOnly: true
        })

        /**
         * Redirect to the homepage.
         */
        return res.redirect('/')
    } catch (err) {
        return next(err)
    }
})

module.exports = router
