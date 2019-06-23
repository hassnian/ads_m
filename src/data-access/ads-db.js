const Id = require("../Id");

module.exports = function makeAdsDb({ makeDb }) {
  return Object.freeze({
    insert
  });

  async function insert({ id: _id = Id.makeId(), ...adtInfo }) {
    const db = await makeDb();
    const result = await db.collection("ads").insertOne({ _id, ...adtInfo });
    const { _id: id, ...insertedInfo } = result.ops[0];
    return { id, ...insertedInfo };
  }
};
