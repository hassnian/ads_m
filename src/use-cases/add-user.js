const makeUser = require("../user/index");
module.exports = function makeAddUser({ usersDb }) {
  return async function addUser(userInfo) {
      
     const user = makeUser(userInfo);

    const exists = await usersDb.findById({ id: user.getId() });
    if (exists) {
      return exists;
    }

    return usersDb.insert({
      name: user.getName(),
      favourites: user.getFavourites(),
      notifications: user.getNotifications(),
      createdOn: user.getCreatedOn(),
      id: user.getId(),
    });
  };


};
