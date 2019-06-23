module.exports=function makeGetAds ({ listAllAds }) {
    return async function getAds (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const ads = await listAllAds()
        return {
          headers,
          statusCode: 200,
          body: ads
        }
      } catch (e) {
        // TODO: Error logging
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