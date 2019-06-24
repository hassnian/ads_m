const makeAd = require("../ad/index");
module.exports = function makeExpireAds({ adsDb }) {
  return async function expireAds({ date }) {
    const response = await adsDb.findExpirablesByDate({ date });
    if (!response) {
      return expireNothing();
    }
    return await softDelete(response);
  };

  function expireNothing() {
    return {
      expiredCount: 0,
      message: "No ads to expire before that date."
    };
  }

  async function softDelete(ads) {
    ads.forEach(async ad => {
      //overwrite the id bcz if not it will generate a new one
      const newAd = makeAd({ id: ad["_id"], ...ad });
      newAd.expire();
      await adsDb.update({
        id: newAd.getId(),
        title: newAd.getTitle(),
        description: newAd.getDescription(),
        createdOn: newAd.getCreatedOn(),
        expired: newAd.isExpired()
      });
    });
    return {
      expiredCount: ads.length,
      message: "Ad expireds."
    };
  }
};
