/*
 * Parent Route: /party
 */
const express = require("express");
const router = express.Router();
const PartyModel = require("../models/partyModel");

// Create a party
router.post("/create", function (req, res) {
    let party = new PartyModel();
    const {
        partyLeader,
        gameID,
        maxPlayers
    } = req.body;

    if (!partyLeader || !gameID || !maxPlayers) {
        return res.json({
            created: false,
            error: "INVALID INPUTS",
        });
    }
    //name = name.trim();
    PartyModel.countDocuments({
            partyLeader: partyLeader,
        },
        function (err, count) {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: Server error",
                });
            } else if (count > 0) {
                return res.send({
                    success: false,
                    message: "Error: Party with this host already exists.",
                });
            }
            party.partyLeader = partyLeader;
            party.gameID = gameID;
            party.maxPlayers = maxPlayers;
            party.save((err, party) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Error: Server error",
                    });
                }
                return res.send({
                    success: true,
                    name: party,
                    message: "Party Created",
                });
            });
        }
    );
});

//Get a party by ID
router.get("/id/:id", function (req, res) {
    var queryID = req.params.id;
    PartyModel.findById(queryID, function (err, doc) {
        if (err)
            return res.json({
                success: false,
                error: err,
            });
        return res.send(doc);
    });
});

// Get all parties playing game ID
router.get("/game/:id", function (req, res) {
    var queryID = req.params.id;
    PartyModel.find({
        'gameID': {
            $in: [queryID]
        }
    }, (err, doc) => {
        if (err) {
            return res.json({
                success: false,
                error: err,
            });
        }
        return res.json({
            success: true,
            parties: doc,
        });
    })
});

// Get all parties
router.get("/", function (req, res) {
    PartyModel.find((err, party) => {
        if (err)
            return res.json({
                success: false,
                error: err,
            });
        return res.json({
            success: true,
            partyObj: party,
        });
    });
});

//Delete the party that belongs to party Leader
router.delete("/:partyLeader", function (req, res) {
    var queryPartyLeader = req.params.partyLeader;
    PartyModel.findOneAndDelete({
            partyLeader: queryPartyLeader,
        },
        function (err, obj) {
            if (err)
                return res.json({
                    success: false,
                    error: err,
                });
            return res.send(obj);
        }
    );
});

//Add a member to the party (non leader)
router.put("/addPartyMember/:id", function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var username = body.username;
    
    if (!username) {
        return res.json({
            created: false,
            error: "INVALID INPUTS",
        });
    }

    var playerObj = {
        username: username,
    };
    PartyModel.findOneAndUpdate({
            _id: queryID,
        }, {
            $push: {
                partyMembers: playerObj,
            },
        },
        function (err) {
            if (err)
                return res.json({
                    success: false,
                    error: err,
                });
            return res.json({
                success: true,
                party: body,
            });
        }
    );
});

//remove a member from the party (non leader)
router.put("/removePartyMember/:id", function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var username = body.username;
    var playerObj = {
        username: username,
    };
    PartyModel.findOneAndUpdate({
            _id: queryID,
        }, {
            $pull: {
                partyMembers: playerObj,
            },
        },
        function (err) {
            if (err)
                return res.json({
                    success: false,
                    error: err,
                });
            return res.json({
                success: true,
                party: body,
            });
        }
    );
});

module.exports = router;