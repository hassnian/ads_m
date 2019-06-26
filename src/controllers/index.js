const {
  addAd,
  listAllAds,
  removeAd,
  expireAds,
  getOneAd,
  addUser,
  favouriteUserAd
} = require("../use-cases/index");
const makePostAd = require("./post-ads");
const makeGetAllAds = require("./get-ads");
const makeGetOneAd = require("./get-ad");
const makeDeleteAd = require("./delete-ad");
const makeDeleteExpireAd = require("./delete-expire-ads");

const makePostUser = require("./post-user");
const makePatchFavouriteUserAd = require("./patch-favourite-user-ad");

const getAllAds = makeGetAllAds({ listAllAds });
const getOne = makeGetOneAd({ getOneAd });
const postAd = makePostAd({ addAd });
const deleteAd = makeDeleteAd({ removeAd });
const deleteExpireAd = makeDeleteExpireAd({ expireAds });

const postUser = makePostUser({ addUser });
const patchFavouriteUserAd = makePatchFavouriteUserAd({ favouriteUserAd });

const adController = Object.freeze({
  postAd,
  postUser,
  getAllAds,
  deleteAd,
  deleteExpireAd,
  patchFavouriteUserAd
});

module.exports = adController;
module.exports = {
  postAd,
  postUser,
  getAllAds,
  deleteAd,
  deleteExpireAd,
  patchFavouriteUserAd,
  getOne
};
