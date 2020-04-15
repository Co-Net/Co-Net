/*
* Schema: User
*/
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserTagSchema = new Schema({name: String}); // need to add schema for postID
const UsersGamesSchema = new Schema({name: String});
const FriendSchema = new Schema({username: String});
const PostIDSchema = new Schema({postID: String});
const playerRepSchema = new Schema({
    username: String, //required field, username of the person posting on the current players profile
    reputation: String, //this will hold a value of + or -'
    comment: String //not required but is an option for other users 
});
const message = new Schema({
    sentBy: String, //the person that the message is sent by
    sentTo: String, //the person that the message is sent to 
    message: String, //the message body
    read: Boolean //boolean that marks the mail as read if the user has read it
});

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"]
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true
    },
    emailAddress: {
        type: String,
        required: [true, "Please enter your email address"],
        unique: true
    },
    password: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    profilePhoto: {
        type: String,
        default: ''
    },
    timeZone: {
        type: String,
        default: '(GMT-08:00) Pacific Time - Los Angeles'
    },
    status:{
        type: String,
        default: 'Offline'
    },
    userTags: [UserTagSchema],
    friends: [FriendSchema],
    games: [UsersGamesSchema],
    forumPosts: [PostIDSchema],
    playerReputation: [playerRepSchema],
    inbox: [message],
    outbox: [message]
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);