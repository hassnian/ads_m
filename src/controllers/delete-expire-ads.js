
module.exports= function makeDeleteExpireAd ({ expireAds }) {
    return async function deleteExpireAd (httpRequest) {
      const headers = {
        'Content-Type': 'application/json'
      }
      try {
        const expireData = await expireAds({ date: httpRequest.params.date })
        return {
          headers,
          statusCode: expireData.expiredCount === 0 ? 404 : 200,
          body: { ...expireData }
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