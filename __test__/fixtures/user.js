const faker = require("faker");
const cuid = require("cuid");

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
});

module.exports = function makeFakeUser(overrides) {
  const user = {
    createdOn: new Date(Date.now()),
    name: faker.name.firstName(),
    id: Id.makeId(),
    favourites: [],
    notifications: []
  };
  return {
    ...user,
    ...overrides
  };
};
