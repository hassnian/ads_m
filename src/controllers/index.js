const { addAd, listAllAds, removeAd ,expireAds,getOneAd} = require("../use-cases/index");
const makePostAd = require("./post-ads");
const makeGetAllAds = require("./get-ads");
const makeGetOneAd = require("./get-ad");
const makeDeleteAd = require("./delete-ad");
const makeDeleteExpireAd = require("./delete-expire-ads");

const getAllAds = makeGetAllAds({ listAllAds });
const getOne = makeGetOneAd({ getOneAd });
const postAd = makePostAd({ addAd });
const deleteAd = makeDeleteAd({ removeAd });
const deleteExpireAd = makeDeleteExpireAd({ expireAds });

const adController = Object.freeze({
  postAd,
  getAllAds,
  deleteAd,
  deleteExpireAd
});

module.exports = adController;
module.exports = { postAd, getAllAds,deleteAd,deleteExpireAd ,getOne};
