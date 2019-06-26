const makeAddAd = require("./add-ad");
const makeListAllAds = require("./listAll-ads");
const makeGetOneAd = require("./getOne-ad")
const makeRemoveAd = require("./remove-ad");
const {adsDb,usersDb} = require("../data-access/index");
const makeExpireAds = require("./expire-ads");

const makeAddUser = require("./add-user");
const makeFavouriteUserAd = require("./favourite-user-ad");


const addAd = makeAddAd({ adsDb });
const listAllAds = makeListAllAds({ adsDb });
const getOneAd = makeGetOneAd({ adsDb });
const removeAd = makeRemoveAd({ adsDb });
const expireAds = makeExpireAds({ adsDb });

const addUser = makeAddUser({ usersDb });
const favouriteUserAd = makeFavouriteUserAd({ usersDb ,adsDb});



const AdService = Object.freeze({
  addAd,
  addUser,
  listAllAds,
  expireAds,
  getOneAd,
  removeAd,
  favouriteUserAd
});

module.exports = AdService;
module.exports = { addAd,addUser, listAllAds, expireAds,removeAd ,getOneAd,favouriteUserAd};
