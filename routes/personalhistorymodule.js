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
    var id = req.params.id;
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

//router.post('/', function(req, res) {
//    console.log('in the module', req.body);
//    var addPersonal = {
//        first_name: req.body.firstName,
//        last_name: req.body.lastName,
//        phone: req.body.phoneNumber,
//        email: req.body.emailAddress,
//        dob: req.body.dateOfBirth,
//        height: req.body.height,
//        //heightInches: req.body.heightInches,
//        weight: req.body.weightPounds,
//        emergency_name: req.body.emergencyContactName,
//        emergency_phone: req.body.emergencyContactNumber
//    };
//    console.log('add personal var', addPersonal);
//
//    pg.connect(connection, function (err, client, done) {
//        client.query('INSERT into client (first_name, last_name, email, phone, dob, height, weight, emergency_name,' +
//            ' emergency_phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id',
//            [addPersonal.first_name, addPersonal.last_name, addPersonal.email,
//                addPersonal.phone, addPersonal.dob, addPersonal.height,
//                addPersonal.weight, addPersonal.emergency_name, addPersonal.emergency_phone],
//            function (err, result) {
//                done();
//                if (err) {
//                    console.log("Error inserting data: ", err);
//                    res.send(false);
//                } else {
//                    res.send(result);
//                    //    add second post for medical conditions
//                }
//            });
//    });
//});







module.exports = router;