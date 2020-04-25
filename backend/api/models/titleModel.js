const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TitleSchema = new Schema({
    title: String
});

module.exports = mongoose.model('Title', TitleSchema);