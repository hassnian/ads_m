const Id = require("../Id");

module.exports = function makeUsersDb({ makeDb }) {
  return Object.freeze({
    insert,
    findAll,
    findById,
    dropDatabase,
    update,
    remove
  });

  async function insert({ id: _id = Id.makeId(), ...usersInfo }) {
    const db = await makeDb();
    const result = await db.collection("users").insertOne({ _id, ...usersInfo });
    const { _id: id, ...insertedInfo } = result.ops[0];
    return { id, ...insertedInfo };
  }

  async function findAll(condition) {
    const db = await makeDb();
    const result = await db.collection("users").find(condition); 
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }));
  } 


  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("users").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function update({ id: _id, ...usersInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("users")
      .updateOne({ _id }, { $set: { ...usersInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...usersInfo } : null;
  }



  async function remove({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("users").deleteOne({ _id });
    return result.deletedCount;
  }

  async function dropDatabase() {
    const db = await makeDb();
    return await db.dropDatabase();
  }
};
