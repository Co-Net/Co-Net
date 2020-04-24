/*
 * Parent Route: /userTags
 */
const express = require('express');
const router = express.Router();
const GameTagModel = require('../models/gameTagModel');

// Get all tags
router.get('/', function (req, res) {
    GameTagModel.find((err, gameTag) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            gameTagObj: gameTag
        });
    });
})

// Get a tag by name
router.get('/:name', function (req, res) {
    var queryName = req.params.name;
    GameTagModel.findOne({
        game_tag: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Create a tag
router.post('/create', function (req, res) {
    let gameTag = new GameTagModel();
    const {
        game_tag
    } = req.body;

    if (!game_tag) {
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
        });
    }
    //name = name.trim();
    GameTagModel.countDocuments({
        game_tag: game_tag
    }, function (err, count) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (count > 0) {
            return res.send({
                success: false,
                message: 'Error: Tag Name Already Exists, Please select from created tags.'
            });
        }
        gameTag.game_tag = game_tag;
        gameTag.save((err, gameTag) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                game_tag: gameTag,
                message: 'Tag Created'
            });
        });
    });
})

//delete a game tag
router.delete("/:name", function(req, res){
    var queryName = req.params.name;
    GameTagModel.findOneAndDelete({
        game_tag: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

module.exports = router;