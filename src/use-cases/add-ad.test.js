const makeAddAd = require("./add-ad");
const makeAdsDb = require("../data-access/ads-db");
const makeFakeAd = require("../../__test__/fixtures/ad");
const makeDb = require("../../__test__/fixtures/db");

describe("add ad", () => {
  let adsDb;
  beforeEach(() => {
    adsDb = makeAdsDb({ makeDb });
  });
  afterEach(async () => {
    await adsDb.dropDatabase();
  });

   it("inserts ad in the database", async () => {
    const newAd = makeFakeAd();
    const addAd = makeAddAd({ adsDb });
    const inserted = await addAd(newAd);
    expect(inserted).toMatchObject(newAd);
  });

  it("return the ad if there is an ad whith the id into  the database", async () => {
    const newAd = makeFakeAd();
    const addAd = makeAddAd({ adsDb });
    await addAd(newAd);
    const inserted = await addAd(newAd);
    expect(inserted).toMatchObject(newAd);
  });

  
});
