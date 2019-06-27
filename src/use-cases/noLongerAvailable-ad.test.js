const makeNoLongerAvailableAd = require("./noLongerAvailable-ad");
const makeAddAd = require("./add-ad");
const makeAddUser = require("./add-user");
const makeAdsDb = require("../data-access/ads-db");
const makeUsersDb = require("../data-access/users-db");
const makeFavouriteUserAd = require("./favourite-user-ad");
const makeFakeAd = require("../../__test__/fixtures/ad");
const makeFakeUser = require("../../__test__/fixtures/user");
const makeDb = require("../../__test__/fixtures/db");
const makeAd = require("../ad/index");
const makeUser = require("../user/index");

describe("no longer available  Ad", () => {
  let adsDb, usersDb;
  const failMsg = msg => {
    return {
      success: false,
      message: msg
    };
  };
  beforeEach(() => {
    adsDb = makeAdsDb({ makeDb });
    usersDb = makeUsersDb({ makeDb });
  });
  afterEach(async () => {
    await adsDb.dropDatabase();
    await usersDb.dropDatabase();
  });

  it("throws an error when there is not an userId ", async () => {
    const noLongerAvailableAd = makeNoLongerAvailableAd({ usersDb, adsDb });
    const req = {
      id: undefined
    };
    const expected = "You must supply an Ad id.";
    expect(noLongerAvailableAd(req)).rejects.toThrow(expected);
  });

  it("returns didnt find ad with that id  ", async () => {
    const noLongerAvailableAd = makeNoLongerAvailableAd({ usersDb, adsDb });
    const favouriteUserAd = makeFavouriteUserAd({ usersDb, adsDb });
    const newAd = makeFakeAd();
    const newUser = makeFakeUser();
    await adsDb.insert(newAd);
    await usersDb.insert(newUser);
    await favouriteUserAd({ userId: newUser.id, adId: newAd.id });
    const req = {
      id: "¡invalidID"
    };
    const expected = failMsg("Didnt find an Ad with the provided id");
    const actual = await noLongerAvailableAd(req);
    expect(actual).toMatchObject(expected);
  });

  it("return no one to nitify", async () => {
    const noLongerAvailableAd = makeNoLongerAvailableAd({ usersDb, adsDb });
    const newAd = makeFakeAd();
    const newUser = makeFakeUser();
    await adsDb.insert(newAd);
    await usersDb.insert(newUser);
    const req = {
      id: newAd.id
    };
    const expected = failMsg("No one to notify.");
    const actual = await noLongerAvailableAd(req);
    expect(actual).toMatchObject(expected);
  });

  it("successfulyy works noLongerAvailable  ", async () => {
    const noLongerAvailableAd = makeNoLongerAvailableAd({ usersDb, adsDb });
    const favouriteUserAd = makeFavouriteUserAd({ usersDb, adsDb });
    const newAd = makeFakeAd();
    const newUser = makeFakeUser();
    await adsDb.insert(newAd);
    await usersDb.insert(newUser);
    await favouriteUserAd({ userId: newUser.id, adId: newAd.id });
    const req = {
      id: newAd.id
    };
    const expected = { success: true };
    const actual = await noLongerAvailableAd(req);
    expect(actual).toMatchObject(expected);
  });

 });
