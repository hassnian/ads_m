const makeAddAd = require("./add-ad");
const makeListAllAds = require("./listAll-ads");
const makeRemoveAd = require("./remove-ad");
const adsDb = require("../data-access/index");

const addAd = makeAddAd({ adsDb });
const listAllAds = makeListAllAds({ adsDb });
const removeAd = makeRemoveAd({ adsDb });

const AdService = Object.freeze({
  addAd,
  listAllAds,
  removeAd
});

module.exports = AdService;
module.exports = { addAd, listAllAds, removeAd };
