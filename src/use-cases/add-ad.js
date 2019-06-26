const makeAd = require("../ad/index");
module.exports = function makeAddAd({ adsDb }) {
  return async function addAd(adInfo) {

    // create an ad first to make sure there are no errors with the ad 
    const ad = makeAd(adInfo);
    const MAX_ADS_DB = 100;

    if ((await adsDb.getNumberOfAds()) >= MAX_ADS_DB) {
      const deletedAd = await deleteOneBefore();
    }

    const exists = await adsDb.findById({ id: ad.getId() });
    if (exists) {
      return exists;
    }

    return adsDb.insert({
      title: ad.getTitle(),
      description: ad.getDescription(),
      createdOn: ad.getCreatedOn(),
      id: ad.getId(),
      expired: ad.isExpired(),
      favourites:ad.getFavourites()
    });
  };

  async function deleteOneBefore() {
    const oldestAd = await adsDb.findOldestAd();
    const removeResponse = await adsDb.remove({ id: oldestAd["_id"] });
    if (removeResponse != 1) {
      return "Error while romving last one";
    }
    return oldestAd;
  }
};
