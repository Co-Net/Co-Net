/*
 * Parent Route: /users
 */
const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Create a user
router.post('/signup', function (req, res) {
    let user = new UserModel();
    const {
        username,
        firstName,
        lastName,
        password
    } = req.body;

    let {
        emailAddress
    } = req.body;

    // Start
    if (!username || !firstName || !lastName || !emailAddress || !password) {
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
        });
    }

    UserModel.countDocuments({
        username: username
    }, function (err, count) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (count > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exists with that username.'
            });
        }

        emailAddress = emailAddress.toLowerCase();
        emailAddress = emailAddress.trim();
        // Steps:
        // 1. Verify email doesn't exist
        // 2. Save
        UserModel.countDocuments({
            emailAddress: emailAddress
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            } else if (previousUsers > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exists with that email.'
                });
            }
            // Save the new user
            user.emailAddress = emailAddress;
            user.password = user.generateHash(password);
            user.username = username;
            user.firstName = firstName;
            user.lastName = lastName;
            user.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    username: user,
                    message: 'Signed up'
                });
            });
        });
    });
})

// Create a JWT token when signing in and saves it in a cookie
router.post('/signin', passport.authenticate('local', {
    session: false
}), function (req, res) {
    const body = {
        username: req.user.username
    }
    req.login(body, {session: false}, (error) => {
        if (error) res.status(400).send({ error });
        jwt.sign(JSON.stringify(body), process.env.JWT_SECRET, (err, token) => {
            if (err) return res.json(err);
            // Set cookie header
            res.cookie('jwt', token, {
                httpOnly: true,
                sameSite: true
            });
            return res.send({
                username: req.user.username,
                success: true
            });
        });
    });
})

module.exports = router;