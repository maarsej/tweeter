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
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
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

  tweetsRoutes.put('/like', function (req, res){
    // if like doesnt exist in db, add key 'like' and set to true
    if ($(this).data('liked') === undefined) {
      $(this).data('liked', true);
      //add 1 like to db
    }
    // if like does exist and == true switch to false and vice versa
    if () {
      // set true to false
      $(this).data('liked', false);
      // subtract 1 like from db

    } else {
      // set false to true
      $(this).data('liked', true);
      //add 1 like to db
    }
  })

  return tweetsRoutes;

}
