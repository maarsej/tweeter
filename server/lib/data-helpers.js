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
    toggleLike: function (tweetId, username, callback) {
      db.collection('tweets').findOne({ _id: ObjectId(tweetId) }, (err, tweet) => {
        let tweetCreatedBy = tweet.user.name;
        if (err) {
          return callback(err);

        } else if (tweetCreatedBy === username) {
          return callback(null, false);
        } else {
          let currentLikes = 0;
          if (tweet.numLikes && tweet.numLikes > 0) {
            currentLikes = tweet.numLikes;
          }
          let addLike = true;
          db.collection('users').findOne({ user: username }, (err, user) => {
            if (!user.liked.includes(tweetId)) {
              console.log(username);
              console.log(user);
              let newLikes = currentLikes + 1;
              db.collection('users').update({user: username}, {$push: {liked: tweetId}}); 
              db.collection('tweets').update({ _id: ObjectId(tweetId) }, { $set: { 'numLikes' : newLikes } });
            } else {
              let newLikes = currentLikes - 1;
              db.collection('users').update({user: username}, {$pull: {liked : tweetId}});
              db.collection('tweets').update({ _id: ObjectId(tweetId) }, { $set: { 'numLikes': newLikes } });
              addLike = false;
            }
            return callback(null, tweet, addLike);
          })
        }
      });
    },
    register: function (req, callback) {
      db.collection('users').find({ user: req.body.user }).toArray((err, results) => {
        // build new object
        let userToInsert = { 'user': req.body.user, 'pass': req.body.pass, 'liked': []};
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
        } else if (user.pass === req.body.pass) {
          let userID = user._id
          return callback(null, userID);
        } else {
          return callback(null, false);
        }
      })
    }
  };
}

