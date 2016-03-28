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
    console.log('this is the query');
    var queryVar = 'INSERT INTO fms ' +
      '(deep_squat, toe_touch, deep_squat_df, hurdle_step, left_leg_up, right_leg_up, hurdle_df, in_line_lunge, left_leg_forward, ' +
      'right_leg_forward, lunge_df, shoulder_mobility, left_top, right_top, left_impingement, right_impingement, shoulder_df, ' +
      'active_straight_leg, left_leg_raise, right_leg_raise, leg_raise_df, trunk_pushup, prone_press_up_test, trunk_df, ' +
      'rotary_stability, kneeling_lumbar, rotary_left_up, rotary_right_up, rotary_df, total, client_id, user_id, date, hand_dominance, ' +
      'swing_dominance, throw_dominance, leg_dominance, right_shin_length, left_shin_length, left_hand_length, right_hand_length) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, ' +
      '$26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41) RETURNING id';
    client.query(queryVar,
      [req.body.deepSquat, req.body.toeTouch, req.body.deepSquatDF, req.body.hurdleStep, req.body.leftLegUp, req.body.rightLegUp, req.body.hurdleDF,
        req.body.inLineLunge, req.body.leftLegForward, req.body.rightLegForward, req.body.lungeDF, req.body.shoulderMobility, req.body.leftTop, req.body.rightTop,
        req.body.leftImpingement, req.body.rightImpingement, req.body.shoulderDF, req.body.activeStraightLeg, req.body.leftLegRaise, req.body.rightLegRaise, req.body.legRaiseDF,
        req.body.trunkPushUp, req.body.pronePressUpTest, req.body.trunkDF, req.body.rotaryStability, req.body.kneelingLumbar, req.body.rotaryLeftUp, req.body.rotaryRightUp,
        req.body.rotaryDF, req.body.total, req.body.client_id, req.body.user_id, req.body.date, req.body.handDominance, req.body.swingDominance,
        req.body.throwDominance, req.body.legDominance, req.body.rightShinLength, req.body.leftShinLength, req.body.leftHandLength, req.body.rightHandLength],
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




module.exports = router;