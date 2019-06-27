const makeUser = require("../user/index");
const makeAd = require("../ad/index");

module.exports = function makeNoLongerAvailableAd({ usersDb, adsDb }) {
  return async function noLongerAvailableAd({ id }) {
    if (!id) {
      throw new Error("You must supply an Ad id.");
    }
    const adInfo = await getAdById(id);
    if (!adInfo) {
      return failedBeacauseOf("Didnt find an Ad with the provided id");
    }
    if (adInfo.favourites.length === 0) {
      return notifyNothing();
    }
    if (!adInfo.favourites) {
      return failedBeacauseOf("No favourite column found");
    }
    
    const usersNotified=[]
    adInfo.favourites.forEach(async userId => {
      const user=await notifyUseerAdUnavailable(userId,adInfo)
      usersNotified.push(user)
    });

    return { success: true, usersNotified };
  };

  async function notifyUseerAdUnavailable(userid,ad) {
    const userInfo = await getUserById(userid);
    if(!userInfo){
      return
    }
    const user = makeUser(userInfo);
    user.removeFavourite(ad.id);
    user.addNotification(ad);

    const notifiedUser = await usersDb.update({
      id: user.getId(),
      name: user.getName(),
      favourites: user.getFavourites(),
      notifications: user.getNotifications(),
      createdOn: user.getCreatedOn()
    });
    return  notifiedUser ;
  }

  function notifyNothing() {
    return {
      success: false,
      message: "No one to notify."
    };
  }
  function failedBeacauseOf(msg) {
    return {
      success: false,
      message: msg
    };
  }

  async function getUserById(userId) {
    const exists = await usersDb.findById({ id: userId });
    if (!exists) {
      return false;
    }
    return exists;
  }

  async function getAdById(adId) {
    const exists = await adsDb.findById({ id: adId });
    if (!exists) {
      return false;
    }
    return exists;
  }
};
