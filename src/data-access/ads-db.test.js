const makeDb = require("../../__test__/fixtures/db");
const makeAdsDb = require("./ads-db");
const makeFakeAd = require("../../__test__/fixtures/ad");

describe("add dbs", () => {
  let adsDb;
  beforeEach(() => {
      adsDb = makeAdsDb({ makeDb });
    });
    //TODO:  add show all test
    it("inserts an ad", async () => {
    const ad = makeFakeAd();
    const result = await adsDb.insert(ad);
    return expect(result).toEqual(ad);
  });
});
