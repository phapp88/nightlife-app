const express = require('express');
const passport = require('../passport');

const indexRouter = express.Router();

indexRouter.get('/auth/twitter', passport.authenticate('twitter'));

indexRouter.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/',
  }),
);

indexRouter.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = indexRouter;
