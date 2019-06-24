const { addAd, listAllAds, removeAd } = require("../use-cases/index");
const makePostAd = require("./post-ads");
const makeGetAllAds = require("./get-ads");
const makeDeleteAd = require("./delete-ad");

const getAllAds = makeGetAllAds({ listAllAds });
const postAd = makePostAd({ addAd });
const deleteAd = makeDeleteAd({ removeAd });

const adController = Object.freeze({
  postAd,
  getAllAds,
  deleteAd
});

module.exports = adController;
module.exports = { postAd, getAllAds,deleteAd };
