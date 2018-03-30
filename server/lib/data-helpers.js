"use strict";

const { ObjectId } = require("mongodb");
// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`
    getTweets: function (callback) {
      db.collection('tweets').find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      })
    },
    toggleLike: function (id, callback) {
      db.collection('tweets').findOne({ _id: ObjectId(id) }, (err, tweet) => {
        if (err) {
          return callback(err);
        } else {
          let currentLikes = 0;
          if (tweet.numLikes) {
            currentLikes = tweet.numLikes;
          }
          if (tweet.like === undefined || tweet.like === false) {
            let newLikes = currentLikes + 1;
            //db.collection('tweets').update({ _id: ObjectId(id) }, { $set: { 'like': true } });
            //give user liked array the objectId

            db.collection('tweets').update({ _id: ObjectId(id) }, { $set: { 'numLikes': newLikes } });
          } else {
            let newLikes = currentLikes - 1;
            //db.collection('tweets').update({ _id: ObjectId(id) }, { $set: { 'like': false } });
            //take away id from user liked array

            db.collection('tweets').update({ _id: ObjectId(id) }, { $set: { 'numLikes': newLikes } });
          }
          return callback(null, tweet);
        }
      });
    },
    register: function (req, callback) {
      db.collection('users').find({ user: req.body.user }).toArray((err, results) => {
        // build new object
        let userToInsert = { 'user': req.body.user, 'pass': req.body.pass, 'liked': [] };
        if (err) {
          return callback(err);
        } else if (!results.length) {
          db.collection('users').insert(userToInsert, function (err) {
            if (err) return;
            let userID = userToInsert._id;
            return callback(null, userID);
          })
        } else {
          return callback(null, false)

        }
      })
    },
    //check if login is valid user
    checkLogin: function (req, callback) {
      db.collection('users').findOne({ user: req.body.user }, function (err, user) {
        if (err) {
          return callback(err);
        } else if (!user) {
          return callback(null, false);
        } else if (user.pass === req.body.pass){
          let userID = user._id
          return callback(null, userID);
        } else {
          return callback(null, false);
        }
      })
    },
    getUserById: function (id, callback) {
      db.collection('users').findOne({ _id : ObjectId(id) }, function (err, user) {
        if (err) {
          return callback(err);
        } else {
          return callback(null, user);
        }
      })
    }
  };
}

