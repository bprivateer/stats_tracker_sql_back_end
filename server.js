const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const BasicStrategy = require('passport-http').BasicStrategy;
const passport = require('passport');
const routes = require('./routes/index');
const app = express();



const users = {
  'bernadette': 'password'
};

passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(routes);

app.listen(3000, function(){
  console.log("We are in here!");
})
