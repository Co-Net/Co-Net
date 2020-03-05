const express = require('express');
const router = express.Router();
const ForumPostModel = require('../models/forumPostModel');

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



module.exports = router;