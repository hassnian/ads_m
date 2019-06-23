const Id = require("../Id");

module.exports = function makeAdsDb({ makeDb }) {
  return Object.freeze({
    insert,
    findAll,
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
};
