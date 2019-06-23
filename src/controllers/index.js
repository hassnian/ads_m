const { addAd } = require("../use-cases/index");
const makePostAd =require ("./post-ads");


const postAd = makePostAd({ addAd });


const adController = Object.freeze({
  postAd
});

module.exports= adController;
module.exports= { postAd };
