"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    console.log(req.body)
    if (!req.body.tweet) {
      // console.log(req.body.text)
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    // console.log('past error .tweet: ', req.body.text.tweet)
    console.log(req.body.text)
    const user = userHelper.generateRandomUser();
    let userID = req.body.id;
    user['name'] = 'placeholder';
    console.log(userID)
    DataHelpers.getUserById(userID, (err, foundUser) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        user.name = foundUser.user;
      }
    })
    
    const tweet = {
      user: user,
      content: {
        text: req.body.tweet
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post("/:id/like", function (req, res) {
    DataHelpers.toggleLike(req.params.id, (err, tweet) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).send(tweet);
      }
    });
      
  })

  return tweetsRoutes;

}
