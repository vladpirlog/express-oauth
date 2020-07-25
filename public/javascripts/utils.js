const info = {
    google: {
        authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        redirectURI: 'http://localhost:3000/oauth/google',
        prompt: 'consent',
        responseType: 'code',
        clientID: '', /* ENTER YOUR GOOGLE CLIENT ID HERE */
        scope: 'https://www.googleapis.com/auth/userinfo.email',
        state: '1234'
    },
    github: {
        authEndpoint: 'https://github.com/login/oauth/authorize',
        redirectURI: 'http://localhost:3000/oauth/github',
        prompt: '',
        responseType: '',
        clientID: '', /* ENTER YOUR GITHUB CLIENT ID HERE */
        scope: 'user',
        state: '1234'
    },
    facebook: {
        authEndpoint: 'https://www.facebook.com/v7.0/dialog/oauth',
        redirectURI: 'http://localhost:3000/oauth/facebook',
        prompt: '',
        responseType: 'code',
        clientID: '', /* ENTER YOUR FACEBOOK CLIENT ID HERE */
        scope: 'public_profile,email',
        state: '1234'
    }
}
for (const elem of ['google', 'github', 'facebook']) {
    const button = document.getElementById(`${elem}-oauth`)
    if (button) {
        button.onclick = () => {
            const form = document.createElement('form')
            form.setAttribute('method', 'GET')
            form.setAttribute('action', info[elem].authEndpoint)

            const params = {
                client_id: info[elem].clientID,
                redirect_uri: info[elem].redirectURI,
                response_type: info[elem].responseType,
                scope: info[elem].scope,
                prompt: info[elem].prompt,
                state: info[elem].state
            }

            for (const p in params) {
                const input = document.createElement('input')
                input.setAttribute('type', 'hidden')
                input.setAttribute('name', p)
                input.setAttribute('value', params[p])
                form.appendChild(input)
            }

            document.body.appendChild(form)
            form.submit()
        }
    }
}
