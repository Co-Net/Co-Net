const express = require('express');
const router = express.Router();
const ForumPostModel = require('../models/forumPostModel');

//create a post or reply
router.post('/createPostOrReply', function (req, res) {
    let post = new ForumPostModel();
    const {
        title,
        body,
        game,
        parentID,
        username
    } = req.body;

    if (!body || !game || !username) {
        return res.json({
            success: false,
            message: 'MISSING INPUTS'
        });
    }

    post.title = title;
    post.body = body;
    post.game = game;
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
            title: post,
            message: 'Post Created'
        });
    });
})

// Delete iPost by ID 
router.delete('/:id', function (req, res) { //neded to figure out what happens when a parent is deleted
    var queryID = req.params.id;

    ForumPostModel.findOneAndDelete({
        _id: queryID
    }, function (err, obj){
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
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

//add a a childID to post
router.put('/addReply/:id', function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var child = body.childID;
    var childObj = {
        "childID": child
    };
    ForumPostModel.findOneAndUpdate({
        _id: queryID
    }, {
        $push: {
            allReplyIDs: childObj
        }
    }, function (err) {
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

//remove a a childID to post
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
    }, function (err) {
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

module.exports = router;