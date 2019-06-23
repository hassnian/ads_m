module.exports = function makePostAd({ addAd }) {
  return async function postAd(httpRequest) {
    try {
      const { ...adInfo } = httpRequest.body;
      const posted = await addAd({
        ...adInfo
      });
      return {
        headers: {
          "Content-Type": "application/json",
      
        },
        statusCode: 201,
        body: { posted }
      };
    } catch (e) {
      // TODO: Error logging
      console.log(e);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
};
