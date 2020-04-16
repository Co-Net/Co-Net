/*
 * Parent Route: /messageThread
 */
const express = require('express');
const router = express.Router();
const MessageThreadModel = require('../models/messageThreadModel');

//no need for getr all message threads

// Get all threads for a specific user
router.get('/:username', function (req, res) {
    var queryUsername = req.params.username;
    MessageThreadModel.find({
        userName1: queryName,
        username2: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Create a message thread if one does not exist
router.post('/create', function (req, res) {
    let messageThread = new MessageThreadModel();
    const {
        username1,
        username2
    } = req.body;

    if (!username1 || !username2) {
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
        });
    }
    MessageThreadModel.countDocuments({
        username1: username1,
        username2: username2
    }, function (err, count) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (count > 0) {
            return res.send({
                success: false,
                message: "Error message thread already exists!"
            });
        }
        messageThread.username1 = username1;
        messageThread.username2 = username2;
        messageThread.save((err, messageThread) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                name: messageThread,
                message: 'Thread Created'
            });
        });
    });
})

//delete a thread
router.delete("/:id", function(req, res){
    var queryID = req.params.id;
    MessageThreadModel.findOneAndDelete({
        _id: queryID
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

module.exports = router;