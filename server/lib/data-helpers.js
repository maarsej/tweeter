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
      // console.log(db.collection('tweets').find({_id: ObjectId(id)}))
      db.collection('tweets').findOne({_id: ObjectId(id)}, (err, tweet) => {
        if (err) {
          return callback(err);
        } else {
          // console.log(tweet);
          let currentLikes = 0;
          // console.log("num of likes on this tweet before changed: ",tweet.numLikes);
          if (tweet.numLikes) {
            currentLikes = tweet.numLikes;
            // console.log('current likes: ', currentLikes);
          }
          if (tweet.like === undefined || tweet.like === false) {
            let newLikes = currentLikes + 1;
            db.collection('tweets').update({ _id: ObjectId(id) }, { $set: { 'like': true } });
            db.collection('tweets').update({ _id: ObjectId(id) }, { $set: { 'numLikes': newLikes } });
          } else {
           //  console.log('in the else in togglelike');
            let newLikes = currentLikes - 1;
            db.collection('tweets').update({ _id: ObjectId(id) }, { $set: { 'like': false } });
            db.collection('tweets').update({ _id: ObjectId(id) }, { $set: { 'numLikes': newLikes } });
          }
          return callback(null, tweet);
        }
      });
    }
  }
};

