const Id = require("../Id/index");
const buildMakeUser = require("./user");

const makeUser = buildMakeUser({ Id });
module.exports = makeUser;
