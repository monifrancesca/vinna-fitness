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
  console.log('Request Body: ', req.body);
  pg.connect(connection, function(err, client, done) {
    console.log('this is the post');
    var queryVar = 'INSERT INTO fms ' +
      '(deep_squat, toe_touch, deep_squat_df, hurdle_step, left_leg_up, right_leg_up, hurdle_df, in_line_lunge, left_leg_forward, ' +
      'right_leg_forward, lunge_df, shoulder_mobility, left_top, right_top, l_impingement, r_impingement, shoulder_df, ' +
      'active_straight_leg, asl_l_up, asl_r_up, leg_raise_df, trunk_pushup, prone_press, trunk_df, ' +
      'rotary_stability, flexion, rotary_left_up, rotary_right_up, rotary_df, total, client_id, user_id, date, hand_dominance, ' +
      'swing_dominance, throw_dominance, leg_dominance, shin_length, hand_length, location_id) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, ' +
      '$26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40) RETURNING id';
    client.query(queryVar,
      [req.body.deepSquat, req.body.toeTouch, req.body.deepSquatDF, req.body.hurdleStep, req.body.leftLegUp, req.body.rightLegUp, req.body.hurdleDF,
        req.body.inLineLunge, req.body.leftLegForward, req.body.rightLegForward, req.body.lungeDF, req.body.shoulderMobility, req.body.leftTop, req.body.rightTop,
        req.body.leftImpingement, req.body.rightImpingement, req.body.shoulderDF, req.body.activeStraightLeg, req.body.leftLegRaise, req.body.rightLegRaise, req.body.legRaiseDF,
        req.body.trunkPushUp, req.body.pronePressUpTest, req.body.trunkDF, req.body.rotaryStability, req.body.kneelingLumbar, req.body.rotaryLeftUp, req.body.rotaryRightUp,
        req.body.rotaryDF, req.body.total, req.body.client_id, req.body.user_id, req.body.date, req.body.handDominance, req.body.swingDominance,
        req.body.throwDominance, req.body.legDominance, req.body.shinLength, req.body.handLength, req.body.location],
      function(err, result) {
        done();
        if(err) {
          console.log(err);
          res.send(result);
        } else {
          console.log('result: ' + result);
        }
      }
    )
  });
});

router.get('/:id', function(req, res) {
  var results = [];

  console.log('get id:', req.params.id);

  pg.connect(connection, function(err, client, done) {
    console.log('this is the get');
    var query = client.query('SELECT fms.deep_squat, fms.toe_touch, fms.deep_squat_df, fms.hurdle_step, fms.left_leg_up, fms.right_leg_up, fms.hurdle_df, fms.in_line_lunge, '+
      'fms.left_leg_forward, fms.right_leg_forward, fms.lunge_df, fms.shoulder_mobility, fms.left_top, fms.right_top, fms.l_impingement, fms.r_impingement, fms.shoulder_df, '+
      'fms.active_straight_leg, fms.asl_l_up, fms.asl_r_up, fms.leg_raise_df, fms.trunk_pushup, fms.prone_press, fms.trunk_df, fms.rotary_stability, client.weight, '+
      'fms.flexion, fms.rotary_left_up, fms.rotary_right_up, fms.rotary_df, fms.total, fms.date, fms.hand_dominance, fms.swing_dominance, fms.throw_dominance, '+
      'fms.leg_dominance, fms.right_shin_length, fms.left_shin_length, fms.left_hand_length, fms.right_hand_length, users.first_name AS user_first_name, users.last_name AS user_last_name '+
      'FROM fms '+
      'LEFT JOIN users ON fms.user_id = users.id '+
      'LEFT JOIN client ON fms.client_id = client.id '+
      'WHERE user_id = $1 '+
      'ORDER BY fms.date DESC;', [req.params.id]);

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // close connection
    query.on('end', function() {
      done();
      return res.json(results);
    });

    if(err) {
      console.log('select error: ', err);
    }
  });
});

router.get('/history/:id', function(req, res) {
  var results = [];

  console.log('get id:', req.params.id);

  pg.connect(connection, function(err, client, done) {
    console.log('getting screens');
    var query = client.query('SELECT fms.date, fms.id, fms.total, users.first_name, users.last_name, location.name ' +
    'FROM fms JOIN users on (fms.user_id = users.id) JOIN location on (fms.location_id ' +
    '= location.id) WHERE fms.client_id = $1', [req.params.id]);

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // close connection
    query.on('end', function() {
      done();
      return res.json(results);
    });

    if(err) {
      console.log('select error: ', err);
    }
  });
});

router.get('/detail/:id', function(req, res) {
  var results = [];
  console.log(req.params.id);
  pg.connect(connection, function (err, client, done) {
    var query = client.query('SELECT fms.date, fms.deep_squat, fms.toe_touch, fms.deep_squat_df, fms.hurdle_step, fms.left_leg_up, fms.right_leg_up, fms.hurdle_df, fms.in_line_lunge, '+
    'fms.left_leg_forward, fms.right_leg_forward, fms.lunge_df, fms.shoulder_mobility, fms.left_top, fms.right_top, fms.shoulder_df, fms.active_straight_leg, fms.leg_raise_df, '+
    'fms.trunk_pushup, fms.trunk_df, fms.rotary_stability, fms.rotary_left_up, fms.rotary_right_up, fms.rotary_df, fms.total, fms.hand_dominance, fms.swing_dominance, '+
    'fms.throw_dominance, fms.leg_dominance, fms.asl_l_up, fms.asl_r_up, fms.prone_press, fms.flexion, fms.l_impingement, fms.r_impingement, location.name, users.first_name, users.last_name '+
    'FROM fms '+
    'JOIN users on fms.user_id = users.id '+
    'JOIN location on fms.location_id = location.id '+
    'WHERE fms.id = $1' ,
    [req.params.id]);

    query.on('row', function(row) {
      results.push(row);
    });

    query.on('end', function() {
      done();
      console.log(results);
      return res.json(results);
    });

    if(err) {
      done();
      console.log(err);
    }
  });
});

module.exports = router;