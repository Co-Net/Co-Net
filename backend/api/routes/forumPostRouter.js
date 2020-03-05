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

    // Start
    if (!body || !game) {
        return res.json({
            success: false,
            message: 'MISSING INPUTS'
        });
    }

    // Save the new user
    post.title = title;
    post.body = body;
    post.game = game;
    post.parentID = parentID;
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
})

module.exports = router;