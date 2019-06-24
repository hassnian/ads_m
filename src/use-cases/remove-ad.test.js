const makeRemoveAd = require("./remove-ad");
const makeAddAd = require("./add-ad");
const makeAdsDb = require("../data-access/ads-db");
const makeFakeAd = require("../../__test__/fixtures/ad");
const makeDb = require("../../__test__/fixtures/db");
const makeAd = require("../ad/index");

describe("remove Ad", () => {
  let adsDb;
  beforeEach(() => {
    adsDb = makeAdsDb({ makeDb });
  });
  it("handles non existent Ads", async () => {
    const removeAd = makeRemoveAd({ adsDb });
    const fakeAd=makeFakeAd({id:null});
    expect(removeAd(fakeAd)).rejects.toThrow("You must supply an Ad id.");
  });

  it("handles non existent Ads", async () => {
    const removeAd = makeRemoveAd({ adsDb });
    const fakeAd = makeFakeAd();
    const expected = {
      deletedCount: 0,
      message: "Ad not found, nothing to delete."
    };
    const actual = await removeAd(fakeAd);
    expect(actual).toEqual(expected);
  });
  it("handles  existent Ads", async () => {
    const removeAd = makeRemoveAd({ adsDb });
    const fakeAd = makeFakeAd();
    const expected = {
      deletedCount: 1,
      message: "Ad deleted."
    };
    const addAd = makeAddAd({ adsDb });
    await addAd(fakeAd)
    const actual = await removeAd(fakeAd);
    expect(actual).toEqual(expected);
  });
});
