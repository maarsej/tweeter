"use strict";

require('dotenv').config();
const PORT = process.env.PORT || 8080;
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const app = express();
const { MongoClient } = require("mongodb");
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(cookieSession({
  name: 'session',
  keys: ['secret'],
}));

var tweetDB = [];
var username = "";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  

    const DataHelpers = require("./lib/data-helpers.js")(db);

    const tweetsRoutes = require("./routes/tweets")(DataHelpers);

    app.get("/", function(req, res) {
      let templateVars = {userID: req.session["userID"], username: req.session['username'], error: '1'};
      res.render("index", templateVars);
      res.status(200)
    });

    app.post("/login", function(req, res) {
      DataHelpers.checkLogin(req, (err, userID) => {
        if (err) {
          res.end("invalid login");
        } else {
          req.session['userID'] = userID;
          req.session['username'] = req.body.user;
          res.status(200).send(userID)
        }
      });
    });

    app.post("/register", function(req, res) {
      DataHelpers.register(req, (err, userID) => {
        if (err) {
          res.end("invalid registration");
        } else {  
          req.session['userID'] = userID;
          req.session['username'] = req.body.user;
          res.status(200).send(userID)
        }
      });
    });

    app.post("/logout", function(req, res) {
      req.session = null;
      res.redirect("/");
    });

    app.use("/tweets", tweetsRoutes);
    
    app.listen(PORT, () => {
      console.log("Example app listening on port " + PORT);
    });
});
