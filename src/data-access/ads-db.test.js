const makeDb = require("../../__test__/fixtures/db");
const makeAdsDb = require("./ads-db");
const makeFakeAd = require("../../__test__/fixtures/ad");

describe("add dbs", () => {
  let adsDb;
  beforeEach( async () => {
    adsDb = await makeAdsDb({ makeDb });
  });

  //TODO:  add show all test
  

  it("findOldestAd ", async () => {
    const ad = makeFakeAd();
    await adsDb.insert(ad);
    console.log(ad);
    const oldest = await adsDb.findOldestAd();
    expect(oldest).toBe(false);
  });


  it("findExpirablesByDate an ad", async () => {
    const ad = makeFakeAd();
    await adsDb.insert(ad);
    const found = await adsDb.findExpirablesByDate({date:"4000-02-24"});
    expect(found[0]["_id"]).toBe(ad.id);
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
