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
    client_id: 2,
    date: req.body.date,
    location_id: 2,
    flag: req.body.flag,
    notes: req.body.notes,
    stretches: req.body.stretches,
    warm_up: req.body.warmup,
    class_type: 1
  };

  var exercises = req.body.exercises;

  function Inserts(template, data) {
    if (!(this instanceof Inserts)) {
      return new Inserts(template, data);
    }
    this._rawDBType = true;
    this.formatDBType = function () {
      return data.map(d=>'(' + pgp.as.format(template, d) + ')').join(',');
    };
  }

  var values = new Inserts('${exercisename}, ${sets}, ${minutes}', exercises);

  console.log('These are the values', values);

  //pg.connect(connection, function(err, client, done) {
  //  client.query("WITH new_workout AS (INSERT INTO workout (user_id, client_id, date, location_id, flag, notes, stretching, " +
  //    "warmup_notes, class_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning * ) INSERT INTO " +
  //    "workout_line_items(workout_id, exercise_id, sets, time) select new_workout.id, $10 from new_workout;",
  //    [newWorkout.user_id, newWorkout.client_id, newWorkout.date, newWorkout.location_id, newWorkout.flag,
  //      newWorkout.notes, newWorkout.stretches, newWorkout.warm_up, newWorkout.class_type, values],
  //    function (err, result) {
  //      if(err) {
  //        console.log("Error inserting data: ", err);
  //        res.send(false);
  //      } else {
  //        res.send(result);
  //      }
  //    });
  //  done();
  //});
});




module.exports = router;