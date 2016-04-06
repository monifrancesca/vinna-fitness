var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var passport = require('./auth/passport');
var configs = require('./config/auth');
var index = require('./routes/index');
var auth = require('./routes/auth');
var private = require('./routes/private/index');
var isLoggedIn = require('./utils/auth');

//route modules
var admin = require('./routes/adminmodule');
var client = require('./routes/clientmodule');
var fms = require('./routes/fmsmodule');
var medical = require('./routes/medicalmodule');
var personal = require('./routes/personalmodule');
var personalhistory = require('./routes/personalhistorymodule');
var workout = require('./routes/workoutmodule');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/admin', admin);
app.use('/client', client);
app.use('/fms', fms);
//app.use('/login', login);
app.use('/medical', medical);
app.use('/personal', personal);
app.use('/personalhistory', personalhistory);
app.use('/workout', workout);

app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/scripts/controllers'));
app.use(express.static('public/scripts/factories'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.use(session({
    secret: configs.sessionVars.secret,
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: { maxage: 60000, secure: false }
}));
/** ---------- PASSPORT ---------- **/
app.use(passport.initialize()); // kickstart passport
/**
 * Alters request object to include user object.
 * @see {@link auth/passport}
 */
app.use(passport.session());
/** ---------- ROUTES ---------- **/
app.use('/auth', auth);
app.use('/private', isLoggedIn, private);
app.use('/', index);

app.use('/admin', admin);
app.use('/client', client);
app.use('/fms', fms);
//app.use('/login', login);
app.use('/medical', medical);
app.use('/personal', personal);
app.use('/workout', workout);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
    console.log('Server is ready on port ' + app.get('port'));
});