const { MongoClient } = require('mongodb');

let dbConnection;

const connectToDb = () => {
  if (!dbConnection) {
    dbConnection = MongoClient.connect(process.env.DB, { useNewUrlParser: true });
  }
  return dbConnection;
};

module.exports = connectToDb;
