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
        parentID
    } = req.body;

    if (!body || !game) {
        return res.json({
            success: false,
            message: 'MISSING INPUTS'
        });
    }

    post.title = title;
    post.body = body;
    post.game = game;
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


module.exports = router;