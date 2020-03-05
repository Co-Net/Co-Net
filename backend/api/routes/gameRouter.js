const express = require('express');
const router = express.Router();
const GameModel = require('../models/gameModel');

// Create a game
router.post('/createGame', function (req, res) {
    let game = new GameModel();
    const {
        name
    } = req.body;
    // Start
    if (!name) {
        return res.json({
            success: false,
            message: 'MISSING INPUTS'
        });
    }

    GameModel.countDocuments({
        name: name
    }, function (err, count) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (count > 0) {
            return res.send({
                success: false,
                message: 'Error: Game already exists!'
            });
        }
        // Save the game
        game.name = name;
        game.numberOfPlayersSearching = 0;
        game.save((err, game) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                name: game,
                message: 'Game Created'
            });
        });
    });
})
//Delete a game
router.delete('/:name', function (req, res) {
    var queryName = req.params.name;
    GameModel.findOneAndDelete({
        name: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

//Get a game 
router.get('/:name', function (req, res) {
    var queryName = req.params.name;
    GameModel.findOne({
        name: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Get all gmaes
router.get('/', function (req, res) {
    GameModel.find((err, game) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            gameObj: game
        });
    });
})

//add a tag to a user
router.put('/addGameTag/:name', function (req, res) {
    var queryName = req.params.name;
    var body = req.body;
    var tag = body.name;
    var tagObj = {
        "name": tag
    };
    GameModel.findOneAndUpdate({
        name: queryName
    }, {
        $push: {
            gameTags: tagObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            game: body
        });
    });
})

// Unfollow a user
router.put('/removeGameTag/:name', function (req, res) {
    var queryName = req.params.name;
    var body = req.body;
    var tag = body.name;
    var tagObj = {
        "name": tag
    };
    GameModel.findOneAndUpdate({
        name: queryName
    }, {
        $pull: {
            gameTags: tagObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            game: body
        });
    });
})

module.exports = router;