const { addAd, listAllAds, removeAd ,expireAds,getOneAd,addUser} = require("../use-cases/index");
const makePostAd = require("./post-ads");
const makeGetAllAds = require("./get-ads");
const makeGetOneAd = require("./get-ad");
const makeDeleteAd = require("./delete-ad");
const makeDeleteExpireAd = require("./delete-expire-ads");

const makePostUser = require("./post-user");



const getAllAds = makeGetAllAds({ listAllAds });
const getOne = makeGetOneAd({ getOneAd });
const postAd = makePostAd({ addAd });
const deleteAd = makeDeleteAd({ removeAd });
const deleteExpireAd = makeDeleteExpireAd({ expireAds });


const postUser = makePostUser({ addUser });

const adController = Object.freeze({
  postAd,
  postUser,
  getAllAds,
  deleteAd,
  deleteExpireAd
});

module.exports = adController;
module.exports = { postAd, postUser,getAllAds,deleteAd,deleteExpireAd ,getOne};
