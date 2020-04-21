const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const message = new Schema({
    message: String, //the message body
    timeSent: Date,
    read: Boolean, //boolean that marks the mail as read if the user has read it
    sentBy: String //username of who sent the message
});

const MessageThreadSchema = new Schema({
    username1: {
        type: String,
        required: [true, "The username of the first user is required"]
    },
    username2: {
        type: String,
        required: [true, "The username of the second user us required"]
    },
    sharedMessages: [message]
});

module.exports = mongoose.model('MessageThread',MessageThreadSchema);