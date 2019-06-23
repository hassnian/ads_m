const makeAddAd = require("./add-ad");
const adsDb = require("../data-access/index");


const addAd = makeAddAd({ adsDb });


const AdService = Object.freeze({
  addAd
});

module.exports = AdService;
module.exports = { addAd };
