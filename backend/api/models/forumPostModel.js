const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplyIDSchema = new Schema({childID: String});

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
        type: String,
        required: [true, "Please enter the game of this thread!"]
    },
    username: { 
        type: String,
        require: [true, "Please enter the username of the user who created this post!"]
    },
    votes: {
        type: Number,
        defualt: 0
    }

})

module.exports = mongoose.model('ForumPost', ForumPostModelSchema);