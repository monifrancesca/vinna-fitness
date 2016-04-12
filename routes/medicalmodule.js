var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var app = express();
var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.post('/:id', function(req, res) {
    //console.log('in the module', req.body);
    var conditions = req.body.conditions;

    var addMedical = {
        id: req.params.id,
        intakeDate: req.body.intakeDate,
        currentInjuries: req.body.currentInjuries,
        previousHistory: req.body.previousHistory,
        otherMeds: req.body.otherMeds,
        infection: req.body.infection,
        inflammation: req.body.inflammation,
        flu: req.body.flu,
        fever: req.body.fever,
        cold: req.body.cold,
        dislocations: req.body.dislocations,
        neckInjuries: req.body.neckInjuries,
        bloodPressure: req.body.bloodPressure,
        heartProblems: req.body.heartProblems,
        headaches: req.body.headaches,
        fainting: req.body.fainting,
        phlebitis: req.body.phlebitis,
        nerves: req.body.nerves,
        physiciansName: req.body.physiciansName,
        physiciansPhone: req.body.physiciansPhone,
        signature: req.body.signature,
        signatureDate: req.body.signatureDate,
        signatureUnderAge: req.body.signatureUnderAge,
        signatureDateUnderAge: req.body.signatureDateUnderAge
    };
    //console.log('add medical var', addMedical);
    pg.connect(connection, function (err, client, done) {
        client.query('UPDATE client SET last_medical = $1, current_injuries = $2,' +
            'previous_medical_hist = $3, medications = $4, infection = $5,' +
            'inflammation = $6, flu = $7, fever = $8, cold = $9,' +
            'physician_name = $10, physician_phone = $11, signature = $12,' +
            'signature_date = $13, signature_under_age = $14, signature_date_under_age = $15' +
            'WHERE id = $16 returning id',
            [addMedical.intakeDate, addMedical.currentInjuries, addMedical.previousHistory,
                addMedical.otherMeds, addMedical.infection, addMedical.inflammation,
                addMedical.flu, addMedical.fever, addMedical.cold, addMedical.physiciansName,
                addMedical.physiciansPhone, addMedical.signature, addMedical.signatureDate,
                addMedical.signatureUnderAge, addMedical.signatureDateUnderAge,
                addMedical.id],
            function (err, result) {
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                    //console.log('result', result);
                    var id = result.rows[0].id;
                    //console.log(conditions);
                    for(var i = 0; i < conditions.length; i++) {
                        client.query("INSERT INTO client_conditions (client_id, condition_id) " +
                            "VALUES ($1, $2)", [id, conditions[i]], function (err, result) {
                            if (err) {
                                console.log("Error inserting data: ", err);
                                res.send(false);
                            }
                        });
                    }
                }
            });
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    var results = [];
    pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM client ' +
            'LEFT OUTER JOIN client_conditions ON (client.id = client_conditions.client_id)' +
            'LEFT OUTER JOIN medical_conditions ON (client_conditions.condition_id = medical_conditions.id)' +
            'WHERE client.id = $1;',
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

module.exports = router;