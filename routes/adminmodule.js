var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
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
      function(err, result) {
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
  var results = [];  // create an empty array for results
  pg.connect(connection, function(err, client, done) {
    var query = client.query('SELECT * FROM location;');

    query.on('row', function(row) { // add data to a row each time it repeats
      results.push(row);
    });

    query.on('end', function() { // return the results array at the end then go back to the data factory
      client.end();
      return res.json(results);
    });

    if(err) {
      console.log(err);
    }
  })
});

router.delete('/locationList:id', function(req, res) {
  var locationId = req.params.id;
  pg.connect(connection, function(err, client, done) {
    client.query('DELETE FROM location WHERE id = $1',
        [locationId],
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


router.get('/clients', function(req, res) {
  var results = [];

  pg.connect(connection, function (err, client, done) {
    var query = client.query("SELECT client.first_name, client.last_name, client.dob, client.active_status, client.id FROM client;");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      client.end();
      return res.json(results);
    });

    if(err) {
      done();
      console.log(err);
    }
  });
});

router.put('/status/:id', function(req, res){
  console.log(req.body);

  var newStatus = {
    status: req.body.active_status,
    id: req.params.id
  };

  pg.connect(connection, function(err, client, done) {
    client.query('UPDATE client SET active_status = ($1) WHERE id = ($2)',
      [newStatus.status, newStatus.id],
      function (err, result) {
        if(err) {
          console.log("Error inserting data: ", err);
          res.send(false);
        } else {
          res.send(result);
        }
      });
    done();
  });
});

router.get('/exercise', function(req, res) {
  var results = [];

  pg.connect(connection, function (err, client, done) {
    var query = client.query("SELECT * FROM exercise;");

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      client.end();
      return res.json(results);
    });

    if(err) {
      done();
      console.log(err);
    }
  });
});

router.put('/exercise/:id', function(req, res){
  console.log(req.body);

  var newStatus = {
    status: req.body.active_status,
    id: req.params.id
  };

  pg.connect(connection, function(err, client, done) {
    client.query('UPDATE exercise SET active_status = ($1) WHERE id = ($2)',
      [newStatus.status, newStatus.id],
      function (err, result) {
        if(err) {
          console.log("Error inserting data: ", err);
          res.send(false);
        } else {
          res.send(result);
        }
      });
    done();
  });
});

router.post('/newexercise', function(req, res) {
  console.log(req.body);

  var newExercise = {
    name: req.body.name,
    category: req.body.category,
    active_status: true
  };

  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO exercise (name, category, active_status) VALUES ($1, $2, $3)",
      [newExercise.name, newExercise.category, newExercise.active_status],
      function (err, result) {
        if(err) {
          console.log("Error inserting data: ", err);
          res.send(false);
        } else {
          res.send(result);
        }
      });
    done();
  });
});

module.exports = router;