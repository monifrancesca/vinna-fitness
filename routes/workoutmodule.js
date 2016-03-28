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
  console.log(req.body);

  var newWorkout = {
    user_id: 2,
    client_id: req.body.client_id,
    date: req.body.date,
    location_id: 2,
    flag: req.body.flag,
    notes: req.body.notes,
    stretches: req.body.stretches,
    warm_up: req.body.warmup,
    class_type: 1
  };

  var exercises = req.body.exercises;

  //First query adds a new workout to the database. On success, the second query loops through the array of exercises
  //and adds the relevant exercises from that workout to the workout_line_items table.

  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO workout (user_id, client_id, date, location_id, flag, notes, stretching, " +
      "warmup_notes, class_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning id",
      [newWorkout.user_id, newWorkout.client_id, newWorkout.date, newWorkout.location_id, newWorkout.flag,
        newWorkout.notes, newWorkout.stretches, newWorkout.warm_up, newWorkout.class_type],
      function (err, result) {
        if(err) {
          console.log("Error inserting data: ", err);
          res.send(false);
        } else {
          res.send(result);
          var workout_id = result.rows[0].id;
          for (var i = 0; i < exercises.length; i++) {
            client.query("INSERT INTO workout_line_items(workout_id, exercise_id, sets, time) VALUES " +
              "($1, $2, $3, $4)", [workout_id, exercises[i].exercisename, exercises[i].sets, exercises[i].minutes],
              function (err, result) {
                if (err) {
                  console.log("Error inserting data: ", err);
                  res.send(false);
                } else {
                }
              }
            );
          }
        }
      });
    done();
  });
});

router.get('/searchname/:query', function(req, res) {
  var results = [];

  var mySearch = {
    search: req.params.query + '%'
  };

  console.log('This is the query', mySearch.search);

  pg.connect(connection, function (err, client, done) {
    var query = client.query("SELECT first_name, last_name, id FROM client WHERE first_name ILIKE $1 OR last_name ILIKE $1;" ,
      [mySearch.search]);

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



module.exports = router;