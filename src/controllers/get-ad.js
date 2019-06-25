module.exports=function makeGetAds ({ getOneAd }) {
    return async function getAds (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const ad = await getOneAd({ id: httpRequest.params.id })
        return {
          headers,
          statusCode: ad.count === 0 ? 404 : 200,
          body: ad
        }
      } catch (e) {
        console.log(e)
        return {
          headers,
          statusCode: 400,
          body: {
            error: e.message
          }
        }
      }
    }
  }