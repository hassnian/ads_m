const makeDb = require("../../__test__/fixtures/db");
const makeAdsDb = require("./ads-db");
const makeFakeAd = require("../../__test__/fixtures/ad");

describe("add dbs", () => {
  let adsDb;
  beforeEach(async () => {
    adsDb = await makeAdsDb({ makeDb });
  });
  afterEach(async () => {
    await adsDb.dropDatabase();
  });

 

  it("find and returns the Oldest Ad ", async () => {
    const ad1 = makeFakeAd({ createdOn: "1999-04-21" });
    const ad2 = makeFakeAd({ createdOn: "2020-04-21" });
    await adsDb.insert(ad1);
    await adsDb.insert(ad2);
    const oldest = await adsDb.findOldestAd();
    expect(oldest.createdOn).toBe(ad1.createdOn);
  });

  it("doesnt find oldest ad and returns false", async () => {
    const oldest = await adsDb.findOldestAd();
    expect(oldest).toBe(false);
  });


  it("  gets correct Number of Ads ", async () => {
    const ad1 = makeFakeAd();
    const ad2 = makeFakeAd();
    await adsDb.insert(ad1);
    await adsDb.insert(ad2);
    const number = await adsDb.getNumberOfAds();
    expect(number).toBe(2);
  });


  it("findExpirablesByDate the correct ad", async () => {
    const ad = makeFakeAd({createdOn:new Date("2020-01-19")});
    await adsDb.insert(ad);
    const found = await adsDb.findExpirablesByDate({ date: "2020-01-20" });
    expect(found[0]["_id"]).toBe(ad.id);
    expect(found[0].createdOn).toMatchObject(ad.createdOn);
  });

  it("inserts an ad", async () => {
    const ad = makeFakeAd();
    const result = await adsDb.insert(ad);
    return expect(result).toEqual(ad);
  });

  it("deletes an ad", async () => {
    const ad = makeFakeAd();
    await adsDb.insert(ad);
    return expect(await adsDb.remove(ad)).toBe(1);
  });
  it("deletes a non existing  ad", async () => {
    const ad = makeFakeAd();
    return expect(await adsDb.remove(ad)).toBe(0);
  });
  it("no ad to expire ", async () => {
    const date = { date: "1590-02-24" };
    return expect(await adsDb.findExpirablesByDate(date)).toBe(false);
  });

  it("updates an ad", async () => {
    const ad = makeFakeAd();
    await adsDb.insert(ad);
    ad.title = "changed";
    const updated = await adsDb.update(ad);
    expect(updated.title).toBe("changed");
  });
});
