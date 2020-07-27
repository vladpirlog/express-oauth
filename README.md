# Express OAuth 2.0

A simple Express app which integrates OAuth authentication with Google, Github and Facebook.

[![App Screenshot](https://res.cloudinary.com/dpcyf1brrl/image/upload/c_scale,w_960/v1595692652/screenshots/express-oauth_rnxdlb.png)](https://res.cloudinary.com/dpcyf1brrl/image/upload/c_scale,w_960/v1595692652/screenshots/express-oauth_rnxdlb.png)

## Getting Started

First, the client IDs given by the OAuth providers must be hardcoded into
the [public/javascripts/utils.js](public/javascripts/utils.js) file, because the requests made from the browser must include these IDs as a query parameter. On the other hand, **the client secrets must only be included as environment variables.**

### Clone and cd into this repository

```bash
git clone https://github.com/vladpirlog/express-oauth.git
cd express-oauth
```

### Install the dependencies

```bash
npm install
```

### Run the app

```bash
npm start
```

An instance of the app will run be running at `http://localhost:3000/`.

### Environment variables

A set of environment variables must be provided in a `.env` file placed in the project's root folder.

* PORT - port to run the application on; defaults to `3000`
* NODE_ENV - NodeJS environment; defaults to `development`
* JWT_KEY - key for symmetrically encrypting the JWTs
* GOOGLE_CLIENT_ID - the OAuth client ID provided by Google
* GOOGLE_CLIENT_SECRET - the OAuth client secret provided by Google
* GITHUB_CLIENT_ID - the OAuth client ID provided by GitHub
* GITHUB_CLIENT_SECRET - the OAuth client secret provided by GitHub
* FACEBOOK_CLIENT_ID - the OAuth client ID provided by Facebook
* FACEBOOK_CLIENT_SECRET - the OAuth client secret provided by Facebook

## Using the app

The user will be prompted to select one of the 3 ways of authentication. Upon giving permission to access basic account info, the user's email and profile image will be displayed on the homepage. These will be stored for a year as an encrypted JWT in a cookie.

Feel free to revoke the access of the OAuth app in the Google/Github/Facebook account dashboard whenever you want.

**The user's email and profile picture URL will not be stored anywhere else other than the `express_oauth` cookie.**

### Getting the OAuth credentials

The client IDs and client secrets can be claimed from the following sources:

* [Google Cloud Console](https://console.cloud.google.com/) - create a new project and go to `APIs & Services --> Credentials --> Create Credentials --> OAuth client ID`
* [GitHub Developers Page](https://github.com/settings/developers) - create a new OAuth project and the credentials will be displayed on the project page
* [Facebook for Developers Page](https://developers.facebook.com/apps/) - create a new app and go to `Settings --> Basic` to get the OAuth credentials

## Contributions

Feel free to contribute to the project by improving the code structure and integrating new OAuth providers.

## Authors

* **Vlad Pirlog** - [vladpirlog](https://github.com/vladpirlog) on Github

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
