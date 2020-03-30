/*
 * Parent Route: /user
 */

const express = require('express');
const router = express.Router();

//Displays information tailored according to the logged in user
router.get('/profile', (req, res, next) => {
  console.log("Profile");
  //We'll just send back the user details and the token
  return res.json({
    message: 'You made it to the secure route',
    username: req.user.username,
    token: req.user.secret_token
  })
});

router.get('/currentuser', (req, res) => {
  if (req.user === undefined) {
    return res.json({});
  } else {
    return res.json({
      username: req.user.username,
      email: req.user.emailAddress
    });
  }
});

module.exports = router;