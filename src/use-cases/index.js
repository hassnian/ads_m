const makeAddAd = require("./add-ad");
const makeListAllAds = require("./listAll-ads");
const adsDb = require("../data-access/index");

const addAd = makeAddAd({ adsDb });
const listAllAds = makeListAllAds({ adsDb });

const AdService = Object.freeze({
  addAd,
  listAllAds
});

module.exports = AdService;
module.exports = { addAd, listAllAds };
