const makeUser = require("../user/index");
const makeAd = require("../ad/index");

module.exports = function makeFavouriteUserAd({ usersDb, adsDb }) {
  return async function favouriteUserAd({ userId, adId }) {
    if (!userId) {
      throw new Error("You must supply an user id.");
    }
    if (!adId) {
      throw new Error("You must supply an Ad id.");
    }
    const userInfo = await getUserById(userId);
    if (!userInfo) {
      return {
        success: false,
        message: "Didnt find an user with the provided id"
      };
    }
    const adInfo = await getAdById(adId);
    if (!adInfo) {
      return {
        success: false,
        message: "Didnt find an Ad with the provided id"
      };
    }
    if(adInfo.expired){
      return {
        success: false,
        message: "Cant ad to favourite an expired  Ad"
      };
    }

    const user = makeUser(userInfo);
    const ad = makeAd(adInfo);

  
    if (user.checkIfIsAlreadyFavourited(ad.getId())) {
      return {
        success: false,
        message: "Already in favourite list"
      };
    }

    const updated = await addToFavorites(user, ad);

    return { success: true, updated };
  };

  async function addToFavorites(user, ad) {

    user.addFavourite(ad.getId());
    ad.addFavourite(user.getId());

    const updatedUser = await usersDb.update({
      id: user.getId(),
      name: user.getName(),
      favourites: user.getFavourites(),
      notifications: user.getNotifications(),
      createdOn: user.getCreatedOn()
    });

    const udpatedAd = await adsDb.update({
      favourites: ad.getFavourites(),
      id: ad.getId(),
      title: ad.getTitle(),
      description: ad.getDescription(),
      createdOn: ad.getCreatedOn(),
      expired: ad.isExpired()
    });
    return { updatedUser, udpatedAd };
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
