    
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const { MongoMemoryServer } = require("mongodb-memory-server");

let connection, db;

const makeDb = async function() {
  const mongod = new MongoMemoryServer();
  const URL = await mongod.getConnectionString();
  const DB_NAME = await mongod.getDbName();
  connection =
    connection || (await MongoClient.connect(URL, { useNewUrlParser: true }));
  db = db || (await connection.db(DB_NAME));
  return db;
};

module.exports = makeDb;