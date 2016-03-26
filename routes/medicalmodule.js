var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var app = express();
var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.post('/:fakeIdentifier', function(req, res) {
    //console.log('in the module', req.body);
    var addMedical = {
        intakeDate: req.body.intakeDate,
        currentInjuries: req.body.currentInjuries,
        first_name: req.params.fakeIdentifier
    };
    console.log('add medical var', addMedical);
    pg.connect(connection, function (err, client, done) {
        client.query('UPDATE client SET last_medical = $1, current_injuries = $2 WHERE first_name = $3',
            [addMedical.intakeDate, addMedical.currentInjuries, addMedical.first_name],
            function (err, result) {
                done();

                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });
});

router.get('/:fakeIdentifier', function(req, res) {
    var fakeId = req.params.fakeIdentifier;
    var results = [];
    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM client WHERE first_name = $1;',
        [fakeId]);

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



module.exports = router;