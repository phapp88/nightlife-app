const passport = require('passport');
const { Strategy: TwitterStrategy } = require('passport-twitter');
const db = require('./db');

const verifyUser = async (token, tokenSecret, profile, done) => {
  const { displayName, username } = profile;
  try {
    const user = await db.getUserByUsername(username);
    if (user) return done(null, user);
    const newUser = { name: displayName, oauth_id: username };
    await db.insertUser(newUser);
    return done(null, newUser);
  } catch (err) {
    return done(err);
  }
};

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
    },
    verifyUser,
  ),
);

// eslint-disable-next-line no-underscore-dangle
passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;
