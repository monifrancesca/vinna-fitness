var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//route modules
var admin = require('./routes/adminmodule');
var client = require('./routes/clientmodule');
var fms = require('./routes/fmsmodule');
var login = require('./routes/loginmodule');
var medical = require('./routes/medicalmodule');
var personal = require('./routes/personalmodule');
var workout = require('./routes/workoutmodule');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/admin', admin);
app.use('/client', client);
app.use('/fms', fms);
app.use('/login', login);
app.use('/medical', medical);
app.use('/personal', personal);
app.use('/workout', workout);

app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/scripts/controllers'));
app.use(express.static('public/scripts/factories'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function() {
    console.log('Server is ready on port ' + app.get('port'));
});