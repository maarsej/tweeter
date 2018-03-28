# Tweeter Project by Jacob Maarse

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Getting Started

Upon cloning this respository simply change your directory to the project file 'tweeter' and run the express_server.js file in node. Since the data base is coded into the js file cookies/cached browser data may need to be clear if the program is restarted. In order to see a full commit/version history navigate one folder up in the repository ('week2') as this folders name was changed mid project to something more appropriate/descriptive.

### Prerequisites

All prerequisite software except Node.js is included in the package.json provided. Simply 'npm install' before attempting to run the program.
- Node.js
- Express
- body-parser
- chance
- moment
- mongoDB
- md5

### Getting Started

```
npm install
```
```
node express_server.js
```
### Final Product

A brief overview of the layout of some of the pages:
#### The login page
!["Screenshot of login page"](https://github.com/maarsej/week2/blob/master/tinyurl/docs/Screen%20Shot%202018-03-21%20at%208.46.10%20PM.png?raw=true)
#### The user's URL list
!["Example of how a users URL list could look "](https://github.com/maarsej/week2/blob/master/tinyurl/docs/Screen%20Shot%202018-03-21%20at%208.45.48%20PM.png?raw=true)

Make sure all URLs added include at least a  // prefix or a full http://


### Bonus Features (Stretch)
Added method-override in order to allow usage of the proper method request in the forms. For example: put/delete requests in the instances of updating a url or deleting a url respectively.
Added analytics to track the number of visits a URL has as well as the number of unique 'sessions' that have visited that url. The server also tracks what time the user visited and by a randomly generated session token those visit times are also displayed. The analytics is shown on the individual url/:id page as shown below.
!["Analytics Page"](https://github.com/maarsej/week2/blob/master/tinyurl/docs/Screen%20Shot%202018-03-22%20at%201.53.52%20PM.png?raw=true)