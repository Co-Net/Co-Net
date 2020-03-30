const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/steam', passport.authenticate('steam'),
    function (req, res) {
        // The request will be redirected to Steam for authentication, so
        // this function will not be called.
    });

router.get('/steam/return',
    passport.authenticate('steam', {
        failureRedirect: '/users/guest'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;