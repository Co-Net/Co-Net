const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const UserModel = require('../models/userModel');

// Login Passport
passport.use(new localStrategy({
    session: false
}, (username, password, done) => {
    UserModel.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Incorrect username.'
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Incorrect password.'
            });
        }
        return done(null, user);
    });
}));

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
}

// JWT Passport
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JWTStrategy(opts, function (user, done) {
    UserModel.findOne({username: user.username}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    })
}));