module.exports = function makePatchFavouriteUserAd({ favouriteUserAd }) {
  return async function patchFavouriteUserAd(httpRequest) {
    const headers = {
      "Content-Type": "application/json"
    };
    try {
      const { userId, adId } = httpRequest.body;
     const favourited = await favouriteUserAd({ userId, adId });
      return {
        headers,
        statusCode: favourited.success === false ? 404 : 200,
        body: { favourited }
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
};
