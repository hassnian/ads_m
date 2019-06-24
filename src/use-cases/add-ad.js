const makeAd =require ('../ad/index')
module.exports= function makeAddAd ({ adsDb }) {
  return async function addAd (adInfo) {
    const ad = makeAd(adInfo)
    // check if exists
     const exists = await adsDb.findById({ id: ad.getId() })
    if (exists) {
      return exists
    }
     
    return adsDb.insert({
      title: ad.getTitle(),
      description: ad.getDescription(),
      createdOn: ad.getCreatedOn(),
      id: ad.getId(),
      expired: ad.isExpired()
    })
  }
}