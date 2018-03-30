"use strict";

const userHelper = require("../lib/util/user-helper")

const express = require('express');
const tweetsRoutes = express.Router();
const cookieSession = require('cookie-session');

tweetsRoutes.use(cookieSession({
  name: 'session',
  keys: ['secret'],
}));

module.exports = function (DataHelpers) {

  tweetsRoutes.get("/", function (req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function (req, res) {
    if (!req.body.tweet) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    const user = userHelper.generateRandomUser();
    user['name'] = req.session.username;

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
    if (!req.session.userID) {
      let outgoing = [false, null];
      res.send(outgoing);
    } else {
      DataHelpers.toggleLike(req.params.id, req.session.username, (err, tweet, addLike) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else if (tweet === false) {
          let outgoing = [tweet, null];
          res.send(outgoing);
        } else {
          let outgoing = [tweet, addLike];
          res.status(200).send(outgoing);
        }
      });
    }

  })

  return tweetsRoutes;

}
