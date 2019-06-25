const Id = require("../Id");

module.exports = function makeAdsDb({ makeDb }) {
  return Object.freeze({
    insert,
    findAll,
    findById,
    findOldestAd,
    getNumberOfAds,
    findExpirablesByDate,
    update,
    remove
  });

  async function insert({ id: _id = Id.makeId(), ...adtInfo }) {
    const db = await makeDb();
    const result = await db.collection("ads").insertOne({ _id, ...adtInfo });
    const { _id: id, ...insertedInfo } = result.ops[0];
    return { id, ...insertedInfo };
  }
  //TODO: show only non expired sprint 3

  async function findAll() {
    const db = await makeDb();
    const result = await db.collection("ads").find({ expired: false }); // only non expired
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }));
  }
  async function getNumberOfAds() {
    const db = await makeDb();
    const result = await db.collection("ads").countDocuments();
    return result;
  }
  async function findOldestAd() {
    const db = await makeDb();
    const oldest = await db
      .collection("ads")
      .find()
      .sort({ createdOn: 1 })
      .limit(1)
      .toArray();

    return oldest.length>0 ? oldest[0] : false
  }
  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("ads").find({ _id });
    const found = await result.toArray();
    if (found.length === 0) {
      return null;
    }
    const { _id: id, ...info } = found[0];
    return { id, ...info };
  }

  async function update({ id: _id, ...adsInfo }) {
    const db = await makeDb();
    const result = await db
      .collection("ads")
      .updateOne({ _id }, { $set: { ...adsInfo } });
    return result.modifiedCount > 0 ? { id: _id, ...adsInfo } : null;
  }

  async function findExpirablesByDate({ date }) {
    const db = await makeDb();
    const dateStamp = new Date(date).getTime();
    const oneDayInEpochTime = 86400000;
    const DateMinusOneDay = new Date(dateStamp - oneDayInEpochTime);
    const result = await db
      .collection("ads")
      .find({ createdOn: { $lte: DateMinusOneDay }, expired: false });
    const found = await result.toArray();
    return found.length > 0 ? found : false;
  }

  async function remove({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection("ads").deleteOne({ _id });
    return result.deletedCount;
  }
};
