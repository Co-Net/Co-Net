const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplyIDSchema = new Schema({id: String});

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
        required: [true, "Please eneter the body of the post or reply!"]
    },
    title: {
        type: String // only allow/require titles if the post is the first parent 
    },
    game: {
        type: String,
        required: [true, "Please eneter the game of this thread!"]
    }

})

module.exports = mongoose.model('ForumPost', ForumPostModelSchema);