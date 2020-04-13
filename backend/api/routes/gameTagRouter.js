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
        name: queryName
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
        name
    } = req.body;

    if (!name) {
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
        });
    }
    //name = name.trim();
    GameTagModel.countDocuments({
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
                message: 'Error: Tag Name Already Exists, Please select from created tags.'
            });
        }
        gameTag.name = name;
        gameTag.save((err, gameTag) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                name: gameTag,
                message: 'Tag Created'
            });
        });
    });
})

//delete a game tag
router.delete("/:name", function(req, res){
    var queryName = req.params.name;
    GameTagModel.findOneAndDelete({
        name: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

module.exports = router;