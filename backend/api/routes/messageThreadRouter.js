/*
 * Parent Route: /messageThread
 */
const express = require('express');
const router = express.Router();
const MessageThreadModel = require('../models/messageThreadModel');
const UserModel = require('../models/userModel');

//no need for getr all message threads

// Get all threads for a specific user
router.get('/:username', function (req, res) {
    var queryUsername = req.params.username;
    MessageThreadModel.find({
        username1: queryUsername
    }, function (err, obj) {
        var combinedThreads = [];
        if (err) return res.json({
            success: false,
            error: err
        });
        combinedThreads = combinedThreads.concat(obj);
        MessageThreadModel.find({
            username2: queryUsername
        }, function (err, obj2) {
            if (err) return res.json({
                success: false,
                error: err
            });
            combinedThreads = combinedThreads.concat(obj2);
            return res.send(combinedThreads);
        });

    });
})

router.get('/byID/:id', function (req, res) {
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
        username2,
        sentBy,
        message
    } = req.body;

    if (!username1 || !username2 || !message || !sentBy) {
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
            // Add message thread to user 1 and user 2
            var messageThreadID = messageThread._id;
            var messageIDobj = {
                "threadID": messageThreadID
            };
            UserModel.findOneAndUpdate({
                username: username1
            }, {
                $push: {
                    allMessageThreads: messageIDobj
                }
            }, {
                new: true
            }, function (err, doc) {
                if (err) return res.json({
                    success: false,
                    error: err
                });
                UserModel.findOneAndUpdate({
                    username: username2
                }, {
                    $push: {
                        allMessageThreads: messageIDobj
                    }
                }, {
                    new: true
                }, function (err, doc2) {
                    if (err) return res.json({
                        success: false,
                        error: err
                    });
                    // Add the composed message to sharedMessages
                    var messageObj = {
                        "message": message,
                        "read": false,
                        "timeSent": new Date(),
                        "sentBy": sentBy
                    };
                    MessageThreadModel.findOneAndUpdate({
                        _id: messageThreadID
                    }, {
                        $push: {
                            sharedMessages: messageObj
                        }
                    }, {
                        new: true
                    }, function (err, doc3) {
                        if (err) return res.json({
                            success: false,
                            error: err
                        });
                        return res.json({
                            success: true,
                            user1: doc,
                            user2: doc2,
                            thread: doc3
                        });
                    });
                });
            });
        });
    });
})

//delete a thread
router.delete("/:id", function (req, res) {
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
    var sentBy = body.sentBy;
    if (!message || !sentBy) {
        return res.json({
            success: false,
            message: "MISSING INPUTS"
        });
    }
    var messageObj = {
        "message": message,
        "read": false,
        "timeSent": new Date(),
        "sentBy": sentBy
    };
    MessageThreadModel.findOneAndUpdate({
        _id: queryID
    }, {
        $push: {
            sharedMessages: messageObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            messageObj: messageObj
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
    MessageThreadModel.findOneAndUpdate({
        _id: queryID
    }, {
        $pull: {
            sharedMessages: messageObj
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