const { MongoClient, ObjectID } = require('mongodb');

let dbConnection;

const connectToDb = () => {
  if (!dbConnection) {
    dbConnection = MongoClient.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return dbConnection;
};

const getBarsCollection = async () => {
  const client = await connectToDb();
  return client.db('nightlife-app').collection('bars');
};

const getUsersCollection = async () => {
  const client = await connectToDb();
  return client.db('nightlife-app').collection('users');
};

const getPeopleGoing = async (barIds) => {
  const barsCollection = await getBarsCollection();
  const docs = await barsCollection.find({ yelpId: { $in: barIds } }).toArray();
  const data = docs.map((doc) => {
    const { peopleGoing, yelpId } = doc;
    return { peopleGoing, yelpId };
  });
  return data;
};

const getUserById = async (id) => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ _id: ObjectID(id) });
  return user;
};

const getUserByUsername = async (username) => {
  const usersCollection = await getUsersCollection();
  const user = await usersCollection.findOne({ oauth_id: username });
  return user;
};

const insertUser = async (newUser) => {
  const usersCollection = await getUsersCollection();
  await usersCollection.insertOne(newUser);
};

const updateBar = async (username, yelpId, peopleGoing) => {
  const barsCollection = await getBarsCollection();
  const update = peopleGoing.includes(username)
    ? { $pull: { peopleGoing: username } }
    : { $push: { peopleGoing: username } };
  const updatedBar = await barsCollection.findOneAndUpdate({ yelpId }, update, {
    returnOriginal: false,
    upsert: true,
  });
  return updatedBar;
};

module.exports = {
  getPeopleGoing,
  getUserById,
  getUserByUsername,
  insertUser,
  updateBar,
};
