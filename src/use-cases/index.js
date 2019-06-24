const makeAddAd = require("./add-ad");
const makeListAllAds = require("./listAll-ads");
const makeRemoveAd = require("./remove-ad");
const adsDb = require("../data-access/index");
const makeExpireAds = require("./expire-ads");

const addAd = makeAddAd({ adsDb });
const listAllAds = makeListAllAds({ adsDb });
const removeAd = makeRemoveAd({ adsDb });
const expireAds = makeExpireAds({ adsDb });

const AdService = Object.freeze({
  addAd,
  listAllAds,
  expireAds,
  removeAd
});

module.exports = AdService;
module.exports = { addAd, listAllAds, expireAds,removeAd };
