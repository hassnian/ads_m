module.exports= function makeListAllAds ({ adsDb }) {
  return async function listAllAds () {
   
   return adsDb.findAll({expired:false}) // only non expired
  }
}