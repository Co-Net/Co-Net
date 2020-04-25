/*
 * Parent Route: /titles
 */
const express = require('express');
const router = express.Router();
const TitleModel = require('../models/titleModel');

// Get all titles
router.get('/', function (req, res) {
    TitleModel.find((err, title) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            titleObj: title
        });
    });
})

module.exports = router;