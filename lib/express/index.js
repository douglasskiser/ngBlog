var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var resource = require('express-namespace');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.favicon());
app.use(express.logger({
    format: 'dev',
    stream: fs.createWriteStream('./lib/express/log/app.log', {'flags': 'w'})
}));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({
    secret: 'mysecuredsession'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://douglasskiser:on3love@ds061198.mongolab.com:61198/ngblog');

var routes = require('../routes')(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
module.exports = app;