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
    clientId: '880550247356-fs40kde8rb0sri2pfq5ibss509h1if02.apps.googleusercontent.com',
    clientSecret: 'vIOqoQBw7RtCa7D3O18SRPwy',
    callbackUrl: 'http://localhost:5000/auth/google/callback'
  },
  sessionVars: {
    secret: 'XvGVXI66XkjP'
  }
};
module.exports = authConfigs;