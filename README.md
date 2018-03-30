# Tweeter Project by Jacob Maarse

Tweeter is a simple, single-page Twitter clone. This project was built on a provided express server which managed the routes and the data transfer between the client and server. The initial html page was manipulated with additional code as well as CSS in order to provide a more aesthetic and functional environment. This styling, in addition to the use of jquery, provide a better environment for user interaction. Continuing with this trend, ajax was added for the seamless addition of new tweets to the feed. Finally, in order to allow tweets to persist through a server restart, a database (mongoDB) was added, with some slight modifications made to code that handled the data such that the user experience remained unaltered.

### Prerequisites

All prerequisite software except Node.js is included in the package.json provided. Simply 'npm install' before attempting to run the program.
- Node.js
- Express
- body-parser
- chance
- cookie-session
- dotenv
- moment
- mongoDB
- md5
- node-sass

### Getting Started
Upon cloning this respository simply change your directory to the project file 'tweeter' and run the server/index.js file in node. Then navigate to http://localhost:8080/ in your browser.

```
npm install
```
```
node index.js
```
### Final Product

A brief overview of the layout of the page:
#### The page
!["Screenshot of the feed"](https://github.com/maarsej/tweeter/blob/master/docs/Screen%20Shot%202018-03-30%20at%2011.27.00%20AM.png?raw=true)


### Bonus Features (Stretch)
Added the ability to login/register, one must be logged in/registered in order to post and like tweets. A user cannot register with another users username and the login credentials must match those in the database. The session info is retained by cookies, which track the name of the user posting tweets such that the proper name is displayed and preventing the user from liking their own tweets. Sass and Heroku were also implemented to provide a most function styling construct and a cloud based service to support the app making it available on the web.

heroku link: https://evening-bastion-92186.herokuapp.com/
