const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const { MongoMemoryServer } = require("mongodb-memory-server");

let connection, db;

module.exports = async function makeDb() {
  const mongod = new MongoMemoryServer();
  const URL = await mongod.getConnectionString();
  const DB_NAME = await mongod.getDbName();
  connection =
    connection || (await MongoClient.connect(URL, { useNewUrlParser: true }));
  db = db || (await connection.db(DB_NAME));
  await db.collection(DB_NAME).deleteMany({}) 
  return db;
};

exports= async function closeDb () {
  console.log("closing");
  await connection.close()
  await db.close()
}

// exports= async function clearDb (databaseb) {
//   return true
// }

// module.exports = { connection, db };
