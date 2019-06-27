const makeAd =require ('../ad/index')
const makeNoLongerAvailableAd = require('./noLongerAvailable-ad')

module.exports= function makeRemoveAd ({ adsDb ,usersDb}) {
  const noLongerAvailableAd=makeNoLongerAvailableAd({adsDb,usersDb})

  return async function removeAd ({ id } = {}) {
    if (!id) {
      throw new Error('You must supply an Ad id.')
    }

    const adToDelete = await adsDb.findById({ id })

    if (!adToDelete) {
      return deleteNothing()
    }
  
    return await hardDelete(adToDelete)
  }



  function deleteNothing () {
    return {
      deletedCount: 0,
      message: 'Ad not found, nothing to delete.'
    }
  }
 
  async function hardDelete (ad) {
    await noLongerAvailableAd(ad)
    await adsDb.remove(ad)
    return {
      deletedCount: 1,
      message: 'Ad deleted.'
    }
  }
}