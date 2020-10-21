const express = require('express');
const fetch = require('node-fetch');
const connectToDb = require('../db');

const barsRouter = express.Router();

barsRouter.get('/', async (req, res) => {
  const { location, offset } = req.query;
  const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=bars&location=${location}&offset=${offset}&limit=12`;
  const yelpRes = await fetch(yelpUrl, {
    headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
  });
  const yelpJson = await yelpRes.json();
  if (yelpJson.error) {
    return res.send(yelpJson);
  }
  const yelpData = await Promise.all(
    yelpJson.businesses.map(async (bar) => {
      const {
        categories,
        id,
        image_url: imageUrl,
        name,
        price = '',
        rating,
        review_count: reviewCount,
        url,
      } = bar;

      const imgRes = await fetch(imageUrl);
      const imgBuf = await imgRes.buffer();
      const imgSrc = `data:imgage/jpeg;base64,${imgBuf.toString('base64')}`;

      return {
        categories,
        id,
        imgSrc,
        name,
        price,
        rating,
        reviewCount,
        url,
      };
    }),
  );
  const barIds = yelpData.map((bar) => bar.id);
  const client = await connectToDb();
  const barsCollection = client.db('nightlife-app').collection('bars');
  const docs = await barsCollection.find({ yelpId: { $in: barIds } }).toArray();
  const mongoData = docs.map((doc) => {
    const { peopleGoing, yelpId } = doc;
    return { peopleGoing, yelpId };
  });
  const combinedData = yelpData.map((bar) => {
    let newData = mongoData.find((doc) => doc.yelpId === bar.id);
    if (!newData) newData = [];
    const { peopleGoing = [] } = newData;
    return { ...bar, peopleGoing };
  });
  return res.send(combinedData);
});

barsRouter.put('/api/bars', async (req, res) => {
  const { bar, username } = req.body;
  const { peopleGoing, id: yelpId } = bar;
  const client = await connectToDb();
  const barsCollection = client.db('nightlife-app').collection('bars');
  const update = peopleGoing.includes(username)
    ? { $pull: { peopleGoing: username } }
    : { $push: { peopleGoing: username } };
  const doc = await barsCollection.findOneAndUpdate({ yelpId }, update, {
    returnOriginal: false,
    upsert: true,
  });
  res.send(doc);
});

module.exports = barsRouter;
