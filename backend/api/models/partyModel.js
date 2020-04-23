const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const player = new Schema({username: String})

const PartySchema = new Schema({
    partyLeader: {
        type: String,
        required: [true, "The username of the party leader is required!"]
    },
    partyMembers: [player]
});

module.exports = mongoose.model('Party', PartySchema);