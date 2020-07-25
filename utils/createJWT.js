const jwt = require('jsonwebtoken')

/**
 * Creates an encrypted JWT with the payload given.
 * @param {"google" | "github" | "facebook"} type the type of payload to be stored in the token
 * @param {object} data the payload to be stored
 */
const createJWT = (type, data) => {
    let payload = {}
    if (type === 'google') {
        payload = {
            type: 'Google',
            email: data.email,
            profileImage: data.picture
        }
    } else if (type === 'github') {
        payload = {
            type: 'GitHub',
            email: data.email,
            profileImage: data.avatar_url
        }
    } else if (type === 'facebook') {
        payload = {
            type: 'Facebook',
            email: data.email,
            profileImage: data.profileImage
        }
    }
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 31536000 })
}

module.exports = createJWT
