const { ObjectID } = require('mongodb');
const passport = require('passport');
const { Strategy: TwitterStrategy } = require('passport-twitter');

const connectToDb = require('./db');

const verifyUser = async (token, tokenSecret, profile, done) => {
  const { displayName, username } = profile;
  const client = await connectToDb();
  const usersCollection = client.db('nightlife1').collection('users');
  try {
    const user = await usersCollection.findOne({ oauth_id: username });
    if (user) return done(null, user);
    const newUser = { name: displayName, oauth_id: username };
    await usersCollection.insertOne(newUser);
    return done(null, newUser);
  } catch (err) {
    return done(err);
  }
};

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL,
}, verifyUser));

// eslint-disable-next-line no-underscore-dangle
passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  const client = await connectToDb();
  const usersCollection = client.db('nightlife1').collection('users');
  try {
    const user = await usersCollection.findOne({ _id: ObjectID(id) });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = passport;
