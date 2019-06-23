const { addAd, listAllAds} = require("../use-cases/index");
const makePostAd =require ("./post-ads");
const makeGetAllAds =require ("./get-ads");


const getAllAds = makeGetAllAds({ listAllAds });
const postAd = makePostAd({ addAd });


const adController = Object.freeze({
  postAd,
  getAllAds
});

module.exports= adController;
module.exports= { postAd ,getAllAds};
