const bodyParser = require('body-parser');
const connectMongo = require('connect-mongo');
const dotenv = require('dotenv');
const express = require('express');
const fetch = require('isomorphic-unfetch');
const next = require('next');
const session = require('express-session');

dotenv.config();

const connectToDb = require('./db');
const passport = require('./passport');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const Mongostore = connectMongo(session);

const wrap = fn => (...args) => fn(...args).catch(args[2]);

app.prepare()
  .then(() => {
    express()
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(session({
        store: new Mongostore({ url: process.env.DB }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      }))
      .use(passport.initialize())
      .use(passport.session())
      .get('/api/bars', wrap(async (req, res) => {
        const { location } = req.query;
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=bars&location=${location}&limit=12`;
        const yelpRes = await fetch(yelpUrl, {
          headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
        });
        const yelpJson = await yelpRes.json();
        if (yelpJson.error) {
          return res.send(yelpJson);
        }
        const yelpData = yelpJson.businesses.map((bar) => {
          const {
            categories, id, image_url: imageUrl, name, price = '', rating,
            review_count: reviewCount, url,
          } = bar;
          return {
            categories, id, imageUrl, name, price, rating, reviewCount, url,
          };
        });
        const barIds = yelpData.map(bar => bar.id);
        const client = await connectToDb();
        const barsCollection = client.db('nightlife1').collection('bars');
        const docs = await barsCollection.find({ yelpId: { $in: barIds } }).toArray();
        const mongoData = docs.map((doc) => {
          const { peopleGoing, yelpId } = doc;
          return { peopleGoing, yelpId };
        });
        const combinedData = yelpData.map((bar) => {
          let newData = mongoData.find(doc => doc.yelpId === bar.id);
          if (!newData) newData = [];
          const { peopleGoing = [] } = newData;
          return Object.assign({}, bar, { peopleGoing });
        });
        return res.send(combinedData);
      }))
      .put('/api/bars', wrap(async (req, res) => {
        const { bar, username } = req.body;
        const { peopleGoing, id: yelpId } = bar;
        const client = await connectToDb();
        const barsCollection = client.db('nightlife1').collection('bars');
        const update = peopleGoing.includes(username)
          ? { $pull: { peopleGoing: username } }
          : { $push: { peopleGoing: username } };
        const doc = await barsCollection.findOneAndUpdate(
          { yelpId },
          update,
          { returnOriginal: false, upsert: true },
        );
        res.send(doc);
      }))
      .get('/auth/twitter', passport.authenticate('twitter'))
      .get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/',
      }))
      .get('/logout', (req, res) => {
        req.logout();
        req.session.destroy((err) => {
          if (err) throw err;
          res.redirect('/');
        });
      })
      .get('*', handle)
      .listen(process.env.PORT || 3000);
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
