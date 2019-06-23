const Id = require("../Id/index");
const buildMakeAd = require("./ad");

const makeAd = buildMakeAd({ Id });
module.exports = makeAd;
