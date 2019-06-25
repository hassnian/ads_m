const Id = require("../Id");

module.exports = function makeAdsDb({ makeDb }) {
  return Object.freeze({
    insert,
    findAll,
    findById,
    dropDatabase,
    remove
  });

  async function insert({ id: _id = Id.makeId(), ...adtInfo }) {
    const db = await makeDb();
    const result = await db.collection("ads").insertOne({ _id, ...adtInfo });
    const { _id: id, ...insertedInfo } = result.ops[0];
    return { id, ...insertedInfo };
  }
//TODO: show only non expired sprint 3

  async function findAll () {
    const db = await makeDb()
    const result = await db.collection('ads').find()
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }
  async function findById ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('ads').find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }

  async function remove ({ id: _id }) {
    const db = await makeDb()
    const result = await db.collection('ads').deleteOne({ _id })
    return result.deletedCount
  }

  async function dropDatabase() {
    const db = await makeDb();
    return await db.dropDatabase();
  }
};
