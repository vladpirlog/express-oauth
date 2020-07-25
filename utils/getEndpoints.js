const axios = require('axios')

/**
 * Functions that return the OAuth endpoints for every provider.
 */
const google = async () => {
    try {
        /**
         * The Google endpoints may be subject to change, that's why the sourceOfTruth endpoint
         *  is used to fetch the information.
         */
        const sourceOfTruth = 'https://accounts.google.com/.well-known/openid-configuration'
        const response = await axios.get(sourceOfTruth)
        return {
            authorization: response.data.authorization_endpoint,
            token: response.data.token_endpoint,
            userInfo: response.data.userinfo_endpoint,
            redirectURI: 'http://localhost:3000/oauth/google'
        }
    } catch (err) {
        return {
            authorization: 'https://accounts.google.com/o/oauth2/v2/auth',
            token: 'https://oauth2.googleapis.com/token',
            userInfo: 'https://openidconnect.googleapis.com/v1/userinfo',
            redirectURI: 'http://localhost:3000/oauth/google'
        }
    }
}

const github = () => {
    return {
        authorization: 'https://github.com/login/oauth/authorize',
        token: 'https://github.com/login/oauth/access_token',
        userInfo: 'https://api.github.com/user',
        redirectURI: 'http://localhost:3000/oauth/github'
    }
}

const facebook = () => {
    return {
        authorization: 'https://www.facebook.com/v7.0/dialog/oauth',
        token: 'https://graph.facebook.com/v7.0/oauth/access_token',
        userInfo: 'https://graph.facebook.com/me',
        userProfilePicture: 'https://graph.facebook.com/',
        redirectURI: 'http://localhost:3000/oauth/facebook'
    }
}

module.exports = { google, github, facebook }
