/**
 * We configure our instance of passport in this file.
 * We must specify:
 * (1) How the user will be serialized (i.e., what data will be made
 * available in a session)
 * (2) How the user will be deserialized (i.e., how do we find the user based
 * on the data available in our session)
 *
 * In addition, we define our authentication strategy in this file.
 *
 * @module auth/passport
 */
 /** ---------- REQUIRE NODE MODULES ---------- **/
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
/** ---------- REQUIRE CUSTOM APP MODULES ---------- **/
var config = require('../config/auth');

// all db queries moved to a service layer, necessary for proper unit testing
var UserService = require('../services/user');
/** ---------- PASSPORT SESSION SERIALIZATION ---------- **/

// serialize the user onto the session
passport.serializeUser(function (user, done) {
  console.log('user idddd: '+user[0].id);
  done(null, user[0].id);
});

// deserialize the user from the session and provide user object
passport.deserializeUser(function (id, done) {
  UserService.findUserById(id, function (err, user) {
    if (err) {
      return done(err);
    }

    return done(null, user);
  });
});
/** ---------- PASSPORT STRATEGY DEFINITION ---------- **/
passport.use('google', new GoogleStrategy({
  // identify ourselves to Google and request Google user data
  clientID: config.googleAuth.clientId,
  clientSecret: config.googleAuth.clientSecret,
  callbackURL: config.googleAuth.callbackUrl
}, function (token, refreshToken, profile, done) {
  // Google has responded
console.log('token: '+token+  ' profile: ' +profile+ ' profile.email: ' + profile.email);
  // does this user exist in our database already?
  UserService.findUserByEmail(profile.email, function (err, user) {
      if (err) {
        return done(err);
      }
      if (user) { // user does exist!
        UserService.updateUser(profile.id, token, profile.displayName,
          profile.emails[0].value, /* we take first email address */
          function (err, user) {
            console.log('updating user');
            if (err) {
              throw err;
            }
          });
        return done(null, user);
      }
    });
}));

module.exports = passport;
