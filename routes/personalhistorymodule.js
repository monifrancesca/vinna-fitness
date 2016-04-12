var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var app = express();
var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.get('/:id', function(req, res) { // colon allows accessing params
    //console.log(req.params);
    var id = 9;
    var results = [];
    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM client WHERE id = $1;',
            [id]);

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

router.put('/', function(req, res) {
    console.log('in the module', req.body);
    var postPersonal = {
        id : req.body.id,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        phone: req.body.phoneNumber,
        email: req.body.emailAddress,
        dob: req.body.dateOfBirth,
        height: req.body.height,
        //heightInches: req.body.heightInches,
        weight: req.body.weightPounds,
        emergency_name: req.body.emergencyContactName,
        emergency_phone: req.body.emergencyContactNumber
    };
    console.log('put personal var', postPersonal);

    pg.connect(connection, function (err, client, done) {
        client.query('UPDATE client SET (first_name, last_name, email, phone, dob, height, weight, emergency_name, emergency_phone)' +
            '= ($1, $2, $3, $4, $5, $6, $7, $8, $9)' +
            'WHERE id = $10' +
            'returning id',
            [postPersonal.first_name, postPersonal.last_name, postPersonal.email,
                postPersonal.phone, postPersonal.dob, postPersonal.height,
                postPersonal.weight, postPersonal.emergency_name, postPersonal.emergency_phone, postPersonal.id],
            function (err, result) {
                done();
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                    //    add second post for medical conditions
                }
            });
    });
});



module.exports = router;