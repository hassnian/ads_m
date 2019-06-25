const makeAddAd = require("./add-ad");
const makeListAllAds = require("./listAll-ads");
const makeAdsDb = require("../data-access/ads-db");
const makeFakeAd = require("../../__test__/fixtures/ad");
const makeDb = require("../../__test__/fixtures/db");

describe("list all ads", () => {
  let adsDb;
  beforeEach(() => {
    adsDb = makeAdsDb({ makeDb });
  });
  afterEach(async () => {
    await adsDb.dropDatabase();
  });

  it("list all ads", async () => {
    const newAd1 = makeFakeAd();
    const newAd2 = makeFakeAd();
    const addAd = makeAddAd({ adsDb });
    const listAllAds=makeListAllAds({adsDb})
    await addAd(newAd1);
    await addAd(newAd2);
    const allAds=await listAllAds()
    expect(allAds[0]).toMatchObject(newAd1);
    expect(allAds[1]).toMatchObject(newAd2);
  });
});
