const express = require('express');
const router = express.Router();
const ForumPostModel = require('../models/forumPostModel');
const UserModel = require('../models/userModel');

//create a post or reply
router.post('/createPostOrReply', function (req, res) {
    let post = new ForumPostModel();
    const {
        title,
        body,
        game,
        gameID,
        parentID,
        username
    } = req.body;

    if (!body || !username) {
        return res.json({
            success: false,
            message: 'MISSING INPUTS'
        });
    }

    post.title = title;
    post.body = body;
    post.game = game;
    post.gameID = gameID;
    post.username = username;
    post.parentID = parentID;
    post.save((err, post) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        return res.send({
            success: true,
            forumPostObj: post,
            message: 'Post Created'
        });
    });
})

// Delete iPost by ID 
router.delete('/:id', function (req, res) { 
    var queryID = req.params.id;

    ForumPostModel.findOneAndDelete({
        _id: queryID
    }, function (err, obj){
        if (err) return res.json({
            success: false,
            error: err
        });

        // If parent was deleted, delete all child/replies with parent id
        ForumPostModel.deleteMany({
            'parentID': {
                $in: [queryID]
            }
        }, function (err) {
            if (err) {
                return res.json({
                    success: false,
                    error: err
                });
            }
            // Go through allReplyIds and remove each reply from corresponding user
            obj.allReplyIDs.forEach((reply) => {
                UserModel.findOneAndUpdate({
                    username: reply.username
                }, {
                    $pull: {
                        forumPosts: {postID: reply.childID}
                    }
                }, { new: true }, function (err, doc) {
                    if (err) return res.json({
                        success: false,
                        error: err
                    });
                });
            });
            return res.json({
                success: true,
                forumPostObj: obj
            });
        })
    });
})

// Get all forum posts
router.get('/', function (req, res) {
    ForumPostModel.find((err, post) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            forumPostObj: post
        });
    });
})

//Get a forum post by Title 
router.get('/title/:title', function (req, res) {
    var queryTitle = req.params.title;
    ForumPostModel.find({
        title: queryTitle
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

//Get forum post by game 
router.get('/game/:game', function (req, res) {
    var queryGame = req.params.game;
    ForumPostModel.find({
        game: queryGame
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

//Get forum posts by username
router.get('/user/:username', function (req, res) {
    var queryUsername = req.params.username;
    ForumPostModel.find({
        username: queryUsername
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

//Update a forum post
router.put('/:id', function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    ForumPostModel.findOneAndUpdate({
        _id: queryID
    }, body, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            post: body
        });
    });
})

// Get post by ID
router.get('/:id', function (req, res) {
    var queryID = req.params.id;
    ForumPostModel.findById(queryID, function (err, doc) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(doc);
    });
})

//add a a childID to parent post
router.put('/addReply/:id', function (req, res) {
    var queryID = req.params.id;        // Parent Post ID
    var body = req.body;
    const { childID, username } = body;
    if (!childID || !username) {
        return res.json({
            success: false,
            error: "INVALID INPUTS",
        });
    }
    var childObj = {
        "childID": childID,
        "username": username
    };
    // Add reply to post
    ForumPostModel.findOneAndUpdate({
        _id: queryID
    }, {
        $push: {
            allReplyIDs: childObj
        }
    }, { new: true }, function (err, doc) {
        if (err) return res.json({
            success: false,
            error: err
        });
        // Update reply (child) to have parent ID
        ForumPostModel.findOneAndUpdate({
            _id: childID
        }, {
            "$set": {
                "parentID": queryID
            }
        }, { new: true }, function (err, doc2) {
            if (err) return res.json({
                success: false,
                error: err
            });
            return res.json({
                success: true,
                child: doc2,
                parent: doc
            });
        });
    });
})

//remove childID from parent post
router.put('/removeReply/:id', function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var child = body.childID;
    var childObj = {
        "childID": child
    };
    ForumPostModel.findOneAndUpdate({
        _id: queryID
    }, {
        $pull: {
            allReplyIDs: childObj
        }
    }, { new: true }, function (err, doc) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            post: doc
        });
    });
})

module.exports = router;