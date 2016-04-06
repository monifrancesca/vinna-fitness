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
          done();
          if(result.rowCount == 0){
            return callback(null, null);} else {
            return callback(null, results);
          }
        });
      });
  },

//  findUserByGoogleId: function (id, callback) {
//      var results = [];
//console.log(id);
//      pg.connect(connection, function(err, client, done) {
//        var query = client.query('SELECT * FROM users WHERE google_id = $1', [id]);
//
//        // Stream results back one row at a time
//        query.on('row', function(row) {
//          console.log('pushing row');
//          results.push(row);
//        });
//
//        // close connection
//        query.on('end', function (result) {
//          console.log('ending query in find by g');
//          done();
//          if(result.rowCount == 0){
//            return callback(null, null);} else {
//            return callback(null, results);
//          }
//        });
//      });
//  },

  findUserByEmail: function (email, callback) {
    var results = [];
    pg.connect(connection, function(err, client, done) {
      var query = client.query('SELECT * FROM users WHERE google_email = $1', [email]);

      // Stream results back one row at a time
      query.on('row', function(row) {
        console.log('pushing row');
        results.push(row);
      });

      // close connection
      query.on('end', function (result) {
        console.log('ending query in find by email');
        done();
        if(result.rowCount == 0){
          return callback(null, null);} else {
          return callback(null, results);
        }
      });
    });
  },

  updateUser: function (id, token, name, email, callback) {
    console.log('in updateUser');
    var results = [];
    googleId = id;
    googleToken = token;
    googleName = name;
    googleEmail = email;
    console.log(connection);
      pg.connect(connection, function(err, client, done) {
        console.log('updating new user');
        var query = client.query('UPDATE users '+
        'SET google_id = $1, google_token = $2, google_name = $3 '+
        'WHERE google_email = $4',
          [googleId, googleToken, googleName, googleEmail]);
        // Stream results back one row at a time
        query.on('row', function(row) {
          console.log('pushing row');
          results.push(row);
        });

        // close connection
        query.on('end', function (result) {
          console.log('ending query in update');
          done();
          if(result.rowCount == 0){
            return callback(null, null);} else {
            return callback(null, results);
          }
        });
      });
  }
};

module.exports = UserService;
