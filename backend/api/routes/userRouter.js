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
            success: false,
            message: 'MISSING INPUTS'
        });
    }

    // Validate username

    // validate password and confirmPassword

    // valite email and confirmEmail

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

//Get a user 
router.get('/:username', function (req, res) {
    var queryUsername = req.params.username;
    UserModel.findOne({
        username: queryUsername
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

router.delete('/:username', function (req, res) {
    var queryUsername = req.params.username;
    UserModel.findOneAndDelete({
        username: queryUsername
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
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

//edit a user
router.put('/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, body, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

// Get all users
router.get('/', function (req, res) {
    UserModel.find((err, user) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            userObj: user
        });
    });
})

//add a tag to a user
router.put('/addTag/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var tag = body.name;
    var tagObj = {
        "name": tag
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $push: {
            userTags: tagObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

// Unfollow a user
router.put('/removeUserTag/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var tag = body.name;
    var tagObj = {
        "name": tag
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $pull: {
            userTags: tagObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

//add a a freind to users friend list
router.put('/addFriend/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var friend = body.username;
    var friendObj = {
        "username": friend
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $push: {
            friends: friendObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

// remove a friend from friends list
router.put('/removeFriend/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var friend = body.username;
    var friendObj = {
        "username": friend
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $pull: {
            friends: friendObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

//add a game to game list
router.put('/addGame/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var game = body.name;
    var gameObj = {
        "name": game
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $push: {
            games: gameObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

//remove game from user game list
router.put('/removeGame/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var game = body.name;
    var gameObj = {
        "name": game
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $pull: {
            games: gameObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

//add a forum post ID to their list of posts
router.put('/addPost/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var post = body.postID;
    var postobj = {
        "postID": post
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $push: {
            forumPosts: postobj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

//remove a forum post ID to their list of posts
router.put('/removePost/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var post = body.postID;
    var postobj = {
        "postID": post
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $pull: {
            forumPosts: postobj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

module.exports = router;