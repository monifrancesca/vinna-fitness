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

router.delete('/classList:id', function(req, res) {
  var classId = req.params.id;
  pg.connect(connection, function(err, client, done) {
    client.query('DELETE FROM class WHERE id = $1',
        [classId],
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

router.post('/classlist', function(req, res) {
  //console.log('req body', req.body);
  var addNewClass = {
    className: req.body.className
  };

  pg.connect(connection, function(err, client, done) {
    client.query('INSERT INTO class (class_type) VALUES ($1)',
        [addNewClass.className],
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


module.exports = router;