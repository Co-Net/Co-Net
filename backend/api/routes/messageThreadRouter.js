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
        username1: queryUsername
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

router.get('/:id', function (req, res){
    var queryID = req.params.id;
    MessageThreadModel.findById(queryID, function (err, doc) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(doc);
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

//add message to thread
router.put('/addMessageToThread/:id', function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var message = body.message;
    var messageObj = {
        "message": message,
        "read": false,
        "timeSent": new Date()
    };
    MessageThreadModel.findOneAndUpdate({
        _id: queryID
    }, {
        $push: {
            messages: messageObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            messageThread: body
        });
    });
})

//remove message from outbox  
router.put('/removeMessageFromThread/:id', function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var messageObj = {
        "_id": body.id
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $pull: {
            messages: messageObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            messageThread: body
        });
    });
})

module.exports = router;