/** Google Cloud API credentials that allows the application to
 * make calls to a Google API.
 * See {@link https://console.developers.google.com}
 * and replace each value with your own.
 * @todo replace each googleAuth value with your app's client credentials
 * @todo give yourself a unique secrect for your sessions
 * @module config/auth
 */
var authConfigs = {
  googleAuth: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL
  },
  sessionVars: {
    secret: process.env.SECRET
  }
};
module.exports = authConfigs;