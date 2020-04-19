/*
* Schema: game
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameTagSchema = new Schema({name: String});
const GameCommentSchema = new Schema({
    username: {
        type: String, 
        required: [true, "Please enter the name of the game!"]
    }, 
    comment: {
        type: String, 
        required: [true, "Please enter the name of the game!"]
    },
    rating: {
        type: Number,
        default: 5
    }
});

const GameSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter the name of the game!"]
    },
    numberOfPlayersSearching:{
        type: Number, //this will be outputted and mutated based on the number of players that are looking to queue for this game
        default: 0
    },
    url: {
        type: String
    },
    releaseDate: {
        type: String
    },
    description: {
        type: String
    },
    reviews: {
        type: String
    },
    gameTags: [String],
    gameCommentsAndRatings: [GameCommentSchema]
    //need to add game image
});
module.exports = mongoose.model('Game', GameSchema);