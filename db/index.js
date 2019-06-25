const { makeDb } = require("../src/data-access/index");
const dotenv = require ("dotenv")
dotenv.config();
(async function setupDb() {
  console.log("Setting up database...");
  // database collection will automatically be created if it does not exist
  const db = await makeDb();
  const result = await db
    .collection("ads")
  console.log(result);
  console.log("Database setup complete...");
  process.exit();
})();
