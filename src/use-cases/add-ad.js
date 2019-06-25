const makeAd =require ('../ad/index')
module.exports= function makeAddAd ({ adsDb }) {
  return async function addAd (adInfo) {

    if(await adsDb.getNumberOfAds()>=5){
      console.log("maXX");
      const deletedAd=await deleteOneBefore()
    }
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

  async function deleteOneBefore(){
    const oldestAd=await adsDb.findOldestAd()
    const removeResponse=await adsDb.remove({id:oldestAd["_id"]})
    if(removeResponse!=1){
      return "Error while romving last one"
    }
    return oldestAd
  }


}