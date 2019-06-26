const makeFavouriteUserAd = require("./favourite-user-ad");
const makeAddAd = require("./add-ad");
const makeAddUser = require("./add-user");
const makeAdsDb = require("../data-access/ads-db");
const makeUsersDb = require("../data-access/users-db");
const makeFakeAd = require("../../__test__/fixtures/ad");
const makeFakeUser = require("../../__test__/fixtures/user");
const makeDb = require("../../__test__/fixtures/db");
const makeAd = require("../ad/index");
const makeUser = require("../user/index");

describe("expire Ad", () => {
  let adsDb, usersDb;
  beforeEach(() => {
    adsDb = makeAdsDb({ makeDb });
    usersDb = makeUsersDb({ makeDb });
  });
  afterEach(async () => {
    await adsDb.dropDatabase();
    await usersDb.dropDatabase();
  });

  it("handles successfully fav an ad", async () => {
    const favouriteUserAd = makeFavouriteUserAd({ usersDb, adsDb });
    const fakeAd = makeFakeAd();
    const fakeUser = makeFakeUser();
    const addAd = makeAddAd({ adsDb });
    const addUser = makeAddUser({ usersDb });

    const req = {
      userId: fakeUser.id,
      adId: fakeAd.id
    };
    const expected = {
      success: true,
      updated: {
        udpatedAd: {
          createdOn: fakeAd.createdOn,
          description: fakeAd.description,
          expired: fakeAd.expired,
          favourites: [fakeUser.id],
          id: fakeAd.id,
          title: fakeAd.title
        },
        updatedUser: {
          createdOn: fakeUser.createdOn,
          favourites: [fakeAd.id],
          id: fakeUser.id,
          name: fakeUser.name,
          notifications: []
        }
      }
    };

    await addAd(fakeAd);
    await addUser(fakeUser);

    const actual = await favouriteUserAd(req);
    expect(actual).toEqual(expected);
  });

  it("throws an error when there is not an userId ", async () => {
    const favouriteUserAd = makeFavouriteUserAd({ usersDb, adsDb });
    const req = {
      userId: undefined,
      adId: "not undefined"
    };
    const expected = "You must supply an user id.";
    expect(favouriteUserAd(req)).rejects.toThrow(expected);
  });

  it("throws error when there is not an adId ", async () => {
    const favouriteUserAd = makeFavouriteUserAd({ usersDb, adsDb });
    const req = {
      userId: "not undefined",
      adId: undefined
    };
    const expected = "You must supply an Ad id.";
    expect(favouriteUserAd(req)).rejects.toThrow(expected);
  });

  it("returns user not found with the provided id", async () => {
    const favouriteUserAd = makeFavouriteUserAd({ usersDb, adsDb });
    const fakeAd = makeFakeAd();
    const fakeUser = makeFakeUser();

    const req = {
      userId: fakeUser.id,
      adId: fakeAd.id
    };
    const expected = {
      success: false,
      message: "Didnt find an user with the provided id"
    };

    const actual = await favouriteUserAd(req);
    expect(actual).toEqual(expected);
  });

  it("returns Ad not found with the provided id", async () => {
    const favouriteUserAd = makeFavouriteUserAd({ usersDb, adsDb });
    const fakeAd = makeFakeAd();
    const fakeUser = makeFakeUser();
    const addUser = makeAddUser({ usersDb });

    const req = {
      userId: fakeUser.id,
      adId: fakeAd.id
    };
    const expected = {
      success: false,
      message: "Didnt find an Ad with the provided id"
    };

    await addUser(fakeUser);
    const actual = await favouriteUserAd(req);
    expect(actual).toEqual(expected);
  });

  it("returns ad already in the favourite list ", async () => {
    const favouriteUserAd = makeFavouriteUserAd({ usersDb, adsDb });
    const fakeAd = makeFakeAd();
    const fakeUser = makeFakeUser();
    const addAd = makeAddAd({ adsDb });
    const addUser = makeAddUser({ usersDb });

    const req = {
      userId: fakeUser.id,
      adId: fakeAd.id
    };
    const expected = {
      success: false,
      message: "Already in favourite list"
    };

    await addAd(fakeAd);
    await addUser(fakeUser);
    await favouriteUserAd(req);

    const actual = await favouriteUserAd(req);
    expect(actual).toEqual(expected);
  });
});
