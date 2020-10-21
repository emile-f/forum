const MongoClient = require("mongodb").MongoClient;
const config = require("./config");

// Guide: https://dzone.com/articles/crud-operations-on-mongodb-thru-nodejs

let database;

const mongoDb = (uri, dbName) => {
  const currentMongo = {};
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  currentMongo.client = new MongoClient(uri, options);

  return new Promise((resolve, reject) => {
    currentMongo.client.connect((err, client) => {
      if (err) throw err;
      console.log("Successfully connected to mongo client!");
      currentMongo.connection = currentMongo.client.db(dbName);
      resolve(currentMongo);
    });
  });
};

const initConnection = async () => {
  return new Promise(async (resolve, reject) => {
    const uri = config.mongo.uri;
    database = await mongoDb(uri, "forum");
    resolve();
  });
};

const getDatabase = () => {
  return database;
};

module.exports = { initConnection, getDatabase };
