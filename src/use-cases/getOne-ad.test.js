const makeAddAd = require("./add-ad");
const makeGetOneAd = require("./getOne-ad");
const makeAdsDb = require("../data-access/ads-db");
const makeFakeAd = require("../../__test__/fixtures/ad");
const makeDb = require("../../__test__/fixtures/db");

describe("get one ad ads", () => {
  let adsDb;
  beforeEach(() => {
    adsDb = makeAdsDb({ makeDb });
  });
  afterEach(async () => {
    await adsDb.dropDatabase();
  });

  it("get one ad when exists", async () => {
    const newAd = makeFakeAd();
    const addAd = makeAddAd({ adsDb });
    const getOneAd = makeGetOneAd({ adsDb });
    const expected = { count: 1, message: "Ad found.", ad: newAd };
    await addAd(newAd);
    const oneAd = await getOneAd(newAd);
    expect(oneAd).toMatchObject(expected);
  });

  it("get one ad when there isnt found", async () => {
    const newAd = makeFakeAd();
    const addAd = makeAddAd({ adsDb });
    const getOneAd = makeGetOneAd({ adsDb });
    const expected = {count:0,message:"No ad found with that id."}
    const oneAd = await getOneAd(newAd);
    expect(oneAd).toMatchObject(expected);
  });
});
