var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var path = require('path');
var pg = require('pg');
var app = express();
var connection = require('../modules/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.post('/', function(req, res) {
  //console.log('in the module', req.body);
  var addLocation = {
    locationName: req.body.locationName
  };
  //console.log('add location var', addLocation);

  pg.connect(connection, function(err, client, done) {
    client.query('INSERT INTO location (name) VALUES ($1)',
      [addLocation.locationName],
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

router.get('/', function(req, res) {
  //var fakeId = req.params.fakeIdentifier;
  var results = [];
  pg.connect(connection, function(err, client, done) {
    var query = client.query('SELECT * FROM client WHERE name = $1;');

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
  })
});

router.get('/trainers', function(req, res) {
  //var fakeId = req.params.fakeIdentifier;
  var results = [];
  pg.connect(connection, function(err, client, done) {
    var query = client.query('SELECT * FROM users');

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
  })
});

router.post('/trainers', function(req, res) {
  console.log('Request Body: ', req.body);
  pg.connect(connection, function(err, client, done) {
    console.log('posting new trainers');
    client.query('INSERT INTO users ' +
      '(admin, google_email, first_name, last_name) ' +
      'VALUES ($1, $2, $3, $4) RETURNING id',
      [req.body.adminStatus, req.body.googleEmail, req.body.tFirstName, req.body.tLastName],
      function(err, result) {
        done();
        if(err) {
          console.log(err);
          res.send(result);
              } else {
                console.log('done posting');
                res.send(result);
              }
    });
  });
});

router.put('/trainers', function(req, res) {
  console.log('Request Body: ', req.body);
  console.log('id '+ req.body.id);
  pg.connect(connection, function(err, client, done) {
    console.log('updating trainer in put ');
    client.query('UPDATE users '+
    'SET admin = $1, google_email = $2, first_name = $3, last_name = $4 '+
    'WHERE id = $5',
      [req.body.admin, req.body.google_email, req.body.first_name, req.body.last_name, req.body.id],
      function(err, result) {
        done();
        if(err) {
          console.log(err);
          res.send(result);
        } else {
          console.log('done posting');
          res.send(result);
        }
      });
  });
});

module.exports = router;