/*
 * Parent Route: /user
 */

const express = require('express');
const router = express.Router();

// Commented cause i think it's not being used
// //Displays information tailored according to the logged in user
// router.get('/profile', (req, res, next) => {
//   console.log("Profile");
//   //We'll just send back the user details and the token
//   return res.json({
//     message: 'You made it to the secure route',
//     username: req.user.username,
//     token: req.user.secret_token
//   })
// });

router.get('/currentuser', (req, res) => {
  if (req.user === undefined) {
    return res.json({
      username: "Guest"
    });
  } else {
    return res.json({
      username: req.user.username,
      email: req.user.emailAddress,
      bio: req.user.bio,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profilePhoto: req.user.profilePhoto,
      timeZone: req.user.timeZone,
      userTags: req.user.userTags,
      playerRep: req.user.playerRep,
      votedPosts: req.user.votedPosts,
      friends: req.user.friends
    });
  }
});

module.exports = router;