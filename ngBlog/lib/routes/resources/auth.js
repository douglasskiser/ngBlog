var passport = require('passport'); // Need for logout route
var User = require('../../models/user');

exports.loggedin = function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
};

exports.login = function(req, res) {
    res.send(req.user);
};

exports.logout = function(req, res) {
    req.logOut();
    res.send(200);
};

exports.register = function(req, res) {
    User.register(new User({
        username: req.body.username
    }),
    req.body.password,
    function(err) {
        if (err) {
            console.log('Registration Error:', err);
            return res.redirect('/');
        }
        return res.redirect('/');
    });
};

