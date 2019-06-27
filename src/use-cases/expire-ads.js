const makeAd = require("../ad/index");
const makeNoLongerAvailableAd = require('./noLongerAvailable-ad')

module.exports = function makeExpireAds({ adsDb ,usersDb}) {
  const noLongerAvailableAd=makeNoLongerAvailableAd({adsDb,usersDb})
  return async function expireAds({ date }) {
    const ads = await adsDb.findExpirablesByDate({ date });
    if (!ads) {
      return expireNothing();
    }
    return await softDelete(ads);
  };
  
  function expireNothing() {
    return {
      expiredCount: 0,
      message: "No ads to expire before that date."
    };
  }
  
  async function softDelete(ads) {
    ads.forEach(async ad => {
      // overwrite the id bcz if not it will generate a new one
      const newAd = makeAd({ id: ad["_id"], ...ad });
      await noLongerAvailableAd({ id: ad["_id"]});
      newAd.expire();
      newAd.removeAllFavourites()
      await adsDb.update({
        id: newAd.getId(),
        title: newAd.getTitle(),
        description: newAd.getDescription(),
        createdOn: newAd.getCreatedOn(),
        favourites: newAd.getFavourites(),
        expired: newAd.isExpired()
      });
    });
    return {
      expiredCount: ads.length,
      message: "Ad expireds."
    };
  }
};
