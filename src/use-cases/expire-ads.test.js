const makeExpireAds = require("./expire-ads");
const makeAddAd = require("./add-ad");
const makeAdsDb = require("../data-access/ads-db");
const makeFakeAd = require("../../__test__/fixtures/ad");
const makeDb = require("../../__test__/fixtures/db");
const makeAd = require("../ad/index");

describe("expire Ad", () => {
  let adsDb;
  beforeEach(() => {
    adsDb = makeAdsDb({ makeDb });
  });
  afterEach(async () => {
    await adsDb.dropDatabase();
  });

  
  it("handles non existent Ads to expire", async () => {
    const expireAds = makeExpireAds({ adsDb });
    const date={date:"2015-05-01"}
    const expected = {
      expiredCount: 0,
      message: 'No ads to expire before that date.'
    };
    const actual = await expireAds(date);
    expect(actual).toEqual(expected);
  });
  it("handles  existent Ads to expire", async () => {
    const expireAds = makeExpireAds({ adsDb });
    const addAd = makeAddAd({ adsDb });
    const fakeAd = makeFakeAd();
    const date={date:"4000-05-01"}
    const expected = {
      expiredCount: 1,
      message: "Ad expireds."
    };
    const newAd=await addAd(fakeAd)
    const actual = await expireAds(date);
    expect(actual).toEqual(expected);
  });
});
