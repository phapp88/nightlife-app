const { MongoClient } = require('mongodb');

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

module.exports = connectToDb;
