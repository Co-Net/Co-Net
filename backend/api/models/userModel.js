/*
* Schema: User
*/
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserTagSchema = new Schema({name: String});
const UsersGamesSchema = new Schema({name: String});
const FriendSchema = new Schema({username: String});


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
    userTags: [UserTagSchema],
    friends: [FriendSchema],
    games : [UsersGamesSchema]
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);