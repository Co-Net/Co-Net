const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplyIDSchema = new Schema({id: String});

const ForumPostModel = new Schema({
    parentID:{
        type: String,
        default: 0
    },
    allReplyIDs: [ReplyIDSchema],
    timePosted:{
        dateTime: Date,
        default: Date.now
    },
    body: {
        text: String,
        required: [true, "Please eneter the body of the post or reply!"]
    },
    title: {
        name: String // only allow/require titles if the post is the first parent 
    },
    game: {
        gameName: String,
        required: [true, "Please eneter the game of this thread!"]
    }

})

module.exports = mongoose.model('ForumPost', ForumPostModel);