/*
 * Parent Route: /users
 */
const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
}).single('file');
const fs = require('fs');
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: "co-net-pix",
    api_key: "472288961331361",
    api_secret: "VylP7m3EhxWbbzWEE8NBAcbcxKs"
});

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
    // eslint-disable-next-line no-useless-escape
    const format = /[ !@#$%^&*()+\-.=\[\]{};':"\\|,<>\/?]/;
    if (format.test(username) || username === 'Guest' || username === 'guest') {
        return res.json({
            created: false,
            message: 'ILLEGAL USERNAME'
        });
    }

    if (password.length < 8) {
        return res.json({
            created: false,
            message: 'SHORT PASSWORD'
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
            user.profilePhoto = "https://res.cloudinary.com/co-net-pix/image/upload/v1586238488/default_user_avatar.jpg";
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

// Log out by deleting cookie
router.get('/logout', function (req, res) {
    res.cookie('jwt', '', {
        expires: new Date(0)
    });
    return res.send({
        loggedOut: true
    });
})

// Get a blank user (used for failure redirect)
router.get('/guest', function (req, res) {
    return res.json({
        username: 'Guest'
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
router.post('/signin', function (req, res, next) {
    passport.authenticate('local', {
        session: false
    }, function (err, user, info) {
        if (err) return next(err);
        if (!user) return res.send({
            message: info.message,
            success: false
        })
        // console.log(user);
        const body = {
            email: user.emailAddress
        }
        req.login(body, {
            session: false
        }, (error) => {
            if (error) res.status(400).send({
                error
            });
            jwt.sign(JSON.stringify(body), process.env.JWT_SECRET, (err, token) => {
                if (err) return res.json(err);
                // Set cookie header
                res.cookie('jwt', token, {
                    httpOnly: true,
                    sameSite: true
                });
                return res.send({
                    username: user.username,
                    email: user.emailAddress,
                    success: true
                });
            });
        });
    })(req, res, next);
});

//edit a user
router.put('/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, body, function (err) {
        if (err) {
            if (err.code == 11000) {
                return res.json({
                    success: false,
                    error: err,
                    message: "Username already exists"
                });
            }
        }
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

// Update a user's photo
router.put('/photo/:username', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        var queryUsername = req.params.username;
        UserModel.findOne({
            username: queryUsername
        }, function (err, obj) {
            var body = obj;
            cloudinary.uploader.upload(req.file.path, function (result) {
                body.profilePhoto = result.url;
                UserModel.findOneAndUpdate({
                    username: queryUsername
                }, body, function (err) {
                    if (err) return res.json({
                        success: false,
                        error: err
                    });
                    // Remove temp file
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.log(err);
                            return res.json({
                                success: false
                            })
                        }
                    });
                    return res.json({
                        success: true,
                        user: body
                    });
                });
            }, {
                folder: "user_photos"
            });
        });
    });
})

// Temp?
// Get a user's photo url
router.get('/photo/:username', function (req, res) {
    var queryUsername = req.params.username;
    UserModel.findOne({
        username: queryUsername
    }, (err, user) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        if (user) {
            return res.json({
                success: true,
                profilePhoto: user.profilePhoto
            });
        }
        return res.json({
            success: false,
            message: "User does not exist"
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

// Remove a tag from user
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

//add player reputation
router.put('/addReputation/:username', function (req, res) {
    var queryUsername = req.params.username; // receiver
    var body = req.body;
    var un = body.username; // author
    var rep = body.reputation;
    var comment = body.comment;
    var avatar = body.avatar;
    var id = body._id;
    var repObj = {
        "_id": id,
        "username": un,
        "rep": rep,
        "comment": comment,
        "avatar": avatar
    };

    // Check if feedback already posted by user
    // First get the player rep array of the user
    UserModel.findOne({
        username: queryUsername
    }, 'playerRep', function (err, doc) {
        if (err) return res.json({
            success: false,
            error: err
        });
        // Check player rep array if user already created review
        const result = doc.playerRep.filter(user => user.username === un);
        if (result.length > 0) {
            // Add logic to update existing feedback using ID
            UserModel.findOneAndUpdate({
                'username': queryUsername,
                'playerRep._id': id
            }, {
                "$set": {
                    "playerRep.$.rep": rep,
                    "playerRep.$.comment": comment
                }
            }, {
                new: true
            }, function (err, doc2) {
                if (err) {
                    return res.json({
                        success: false,
                        error: err
                    });
                }
                return res.json({
                    success: true,
                    result: "UPDATED",
                    message: "Feedback updated successfully",
                    feedback: repObj,
                    playerRep: doc2.playerRep
                });
            });
        } else {
            // Else add new feedback
            UserModel.findOneAndUpdate({
                username: queryUsername
            }, {
                $push: {
                    playerRep: repObj
                }
            }, {
                new: true
            }, function (err, doc) {
                if (err) return res.json({
                    success: false,
                    result: "ERROR",
                    error: err
                });
                repObj._id = doc.playerRep[doc.playerRep.length - 1]._id;
                return res.json({
                    success: true,
                    result: "CREATED",
                    message: "Feedback created successfully",
                    feedback: repObj,
                    playerRep: doc.playerRep
                });
            });
        }
    })
})

// remove all player rep
router.put('/removeAllReputation/:username', function (req, res) {
    var queryUsername = req.params.username;
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        playerRep: []
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            message: "All rep removed"
        });
    });
})

//remove player reputation 
router.put('/removeReputation/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var un = body.username;
    var rep = body.reputation;
    var comment = body.comment;
    var repObj = {
        "username": un,
        "rep": rep,
        "comment": comment
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $pull: {
            playerRep: repObj
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

//add message to inbox
router.put('/addMailToInbox/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var sentBy = body.sentBy;
    var message = body.message;
    var messageObj = {
        "sentBy": sentBy,
        "message": message,
        "read": false,
        "sentTo": queryUsername

    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $push: {
            inbox: messageObj
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

//remove message from inbox  
router.put('/removeMailFromInbox/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var messageObj = {
        "_id": body.id
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $pull: {
            inbox: messageObj
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

//add message to outbox
router.put('/addMailToOutbox/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var sentTo = body.sentTo;
    var message = body.message;
    var messageObj = {
        "sentTo": sentTo,
        "message": message,
        "read": true,
        "sentBy": queryUsername

    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $push: {
            outbox: messageObj
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

//remove message from outbox  
router.put('/removeMailFromOutbox/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var messageObj = {
        "_id": body.id
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $pull: {
            outbox: messageObj
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