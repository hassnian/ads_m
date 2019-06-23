module.exports= function makeListAllAds ({ adsDb }) {
  return async function listAllAds () {
   return adsDb.findAll()
  }
}