/**
 * A service layer that makes all of our User database queries.
 *
 * @module services/user
 *
 * @function findUserById finds a User by their unique Mongo id
 * @function findUserByGoogleId finds a User by their Google id
 * @function create a User that will be authenticated by Google
 */
var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var connection = require('../modules/connection');
var pg = require('pg');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var UserService = {
  findUserById: function (id, callback) {
      var results = [];

      pg.connect(connection, function(err, client, done) {
        console.log('findUserByIdGet');
        var query = client.query('SELECT * FROM users WHERE id = $1', [id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
          results.push(row);
        });

        // close connection
        query.on('end', function (result) {
          if(result.rowCount == 0){
            return callback(null, null);} else {
            return callback(null, results);
          }
        });
      });
  },

  findUserByGoogleId: function (id, callback) {
      var results = [];
console.log(id);
      pg.connect(connection, function(err, client, done) {
        var query = client.query('SELECT * FROM users WHERE google_id = $1', [id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
          console.log('pushing row');
          results.push(row);
        });

        // close connection
        query.on('end', function (result) {
          console.log('ending query');
          if(result.rowCount == 0){
            return callback(null, null);} else {
            return callback(null, results);
          }
        });
      });
  },

  createGoogleUser: function (id, token, name, email, callback) {
    console.log('in create google user');
    googleId = id;
    googleToken = token;
    googleName = name;
    googleEmail = email;
    console.log(connection);
      pg.connect(connection, function(err, client, done) {
        console.log('posting new user');
        client.query('INSERT INTO users ' +
          '(google_id, google_token, google_name, google_email) VALUES ($1, $2, $3, $4) RETURNING *',
          [googleId, googleToken, googleName, googleEmail],
          function (err, user) {
            if (err) {
              return callback(err, null);
            }

            return callback(null, user);
          }
        )
      });
  }
};

module.exports = UserService;
