const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplyIDSchema = new Schema({childID: String, username: String});

const ForumPostModelSchema = new Schema({
    parentID:{
        type: String,
        default: 0
    },
    allReplyIDs: [ReplyIDSchema],
    timePosted:{
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        required: [true, "Please enter the body of the post or reply!"]
    },
    title: {
        type: String, // only allow/require titles if the post is the first parent 
        default: 'No title, because child!'
    },
    game: {
        type: String
    },
    gameID: {
        type: String
    },
    username: { 
        type: String,
        required: [true, "Please enter the username of the user who created this post!"]
    },
    votes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('ForumPost', ForumPostModelSchema);