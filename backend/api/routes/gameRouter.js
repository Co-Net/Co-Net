/*
 * Parent Route: /games
 */
const express = require("express");
const router = express.Router();
const GameModel = require("../models/gameModel");

// Create a game
router.post("/createGame", function (req, res) {
  let game = new GameModel();
  const { name } = req.body;
  // Start
  if (!name) {
    return res.json({
      success: false,
      message: "MISSING INPUTS",
    });
  }

  GameModel.countDocuments(
    {
      name: name,
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
          message: "Error: Game already exists!",
        });
      }
      // Save the game
      game.name = name;
      game.numberOfPlayersSearching = 0;
      game.save((err, game) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error",
          });
        }
        return res.send({
          success: true,
          name: game,
          message: "Game Created",
        });
      });
    }
  );
});

//Delete a game
router.delete("/:name", function (req, res) {
  var queryName = req.params.name;
  GameModel.findOneAndDelete(
    {
      name: queryName,
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

//edit a game
router.put("/:name", function (req, res) {
  var queryName = req.params.name;
  var body = req.body;
  GameModel.findOneAndUpdate(
    {
      name: queryName,
    },
    body,
    function (err) {
      if (err)
        return res.json({
          success: false,
          error: err,
        });
      return res.json({
        success: true,
        game: body,
      });
    }
  );
});

//Get a game by name
router.get("/name/:name", function (req, res) {
  var queryName = req.params.name;
  GameModel.findOne(
    {
      name: queryName,
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

//Get a game by ID
router.get("/id/:id", function (req, res) {
  var queryID = req.params.id;
  GameModel.findById(queryID, function (err, obj) {
    if (err)
      return res.json({
        success: false,
        error: err,
      });
    return res.json({
      success: true,
      gameObj: obj
    });
  });
});

// Get all gmaes
router.get("/", function (req, res) {
  GameModel.find((err, game) => {
    if (err)
      return res.json({
        success: false,
        error: err,
      });
    return res.json({
      success: true,
      gameObj: game,
    });
  });
});

//add a game tag
router.put("/addGameTag/:name", function (req, res) {
  var queryName = req.params.name;
  var body = req.body;
  var tag = body.name;
  GameModel.findOneAndUpdate(
    {
      name: queryName,
    },
    {
      $addToSet: {
        gameTags: tag,
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
        game: body,
      });
    }
  );
});

// remove a game tag
router.put("/removeGameTag/:name", function (req, res) {
  var queryName = req.params.name;
  var body = req.body;
  var tag = body.name;
  GameModel.findOneAndUpdate(
    {
      name: queryName,
    },
    {
      $pull: {
        gameTags: tag,
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
        game: body,
      });
    }
  );
});

//remove a comment
router.put("/addComment/:name", function (req, res) {
  var queryName = req.params.name;
  var body = req.body;
  var username = body.username;
  var comment = body.comment;
  var rating = body.rating;
  var commentAndTagObj = {
    username: username,
    comment: comment,
    rating: rating,
  };
  GameModel.findOneAndUpdate(
    {
      name: queryName,
    },
    {
      $push: {
        gameCommentsAndRatings: commentAndTagObj,
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
        game: body,
      });
    }
  );
});

// add a commment
router.put("/removeComment/:name", function (req, res) {
  var queryName = req.params.name;
  var body = req.body;
  var username = body.username;
  var comment = body.comment;
  var rating = body.rating;
  var commentAndTagObj = {
    username: username,
    comment: comment,
    rating: rating,
  };
  GameModel.findOneAndUpdate(
    {
      name: queryName,
    },
    {
      $pull: {
        gameCommentsAndRatings: commentAndTagObj,
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
        game: body,
      });
    }
  );
});

module.exports = router;
