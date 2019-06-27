const { adsDb, usersDb } = require("../data-access/index");
const makeAddAd = require("./add-ad");
const makeListAllAds = require("./listAll-ads");
const makeGetOneAd = require("./getOne-ad");
const makeRemoveAd = require("./remove-ad");
const makeExpireAds = require("./expire-ads");
const makeNoLongerAvailableAd = require("./noLongerAvailable-ad");

const makeAddUser = require("./add-user");
const makeFavouriteUserAd = require("./favourite-user-ad");

const addAd = makeAddAd({ adsDb });
const listAllAds = makeListAllAds({ adsDb });
const getOneAd = makeGetOneAd({ adsDb });
const removeAd = makeRemoveAd({ adsDb ,usersDb});
const expireAds = makeExpireAds({ adsDb ,usersDb});
const noLongerAvailableAd = makeNoLongerAvailableAd({ usersDb, adsDb });

const addUser = makeAddUser({ usersDb });
const favouriteUserAd = makeFavouriteUserAd({ usersDb, adsDb });

const AdService = Object.freeze({
  addAd,
  addUser,
  listAllAds,
  expireAds,
  getOneAd,
  removeAd,
  favouriteUserAd,
  noLongerAvailableAd
});

module.exports = AdService;
module.exports = {
  addAd,
  addUser,
  listAllAds,
  expireAds,
  removeAd,
  getOneAd,
  favouriteUserAd,
  noLongerAvailableAd
};
