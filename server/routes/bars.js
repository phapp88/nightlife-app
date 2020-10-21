const express = require('express');
const getYelpData = require('../utils/getYelpData');
const db = require('../db');

const barsRouter = express.Router();

barsRouter.get('/', async (req, res) => {
  const { location, offset } = req.query;

  const yelpData = await getYelpData(location, offset);

  const barIds = yelpData.map((bar) => bar.id);
  const mongoData = await db.getPeopleGoing(barIds);

  const combinedData = yelpData.map((bar) => {
    let newData = mongoData.find((doc) => doc.yelpId === bar.id);
    if (!newData) newData = [];
    const { peopleGoing = [] } = newData;
    return { ...bar, peopleGoing };
  });
  return res.send(combinedData);
});

barsRouter.put('/', async (req, res) => {
  const { bar, username } = req.body;
  const { peopleGoing, id: yelpId } = bar;
  const updatedBar = await db.updateBar(username, yelpId, peopleGoing);
  res.send(updatedBar);
});

module.exports = barsRouter;
