module.exports = function makeGetOneAd({ adsDb }) {
  return async function getOneAd({ id }) {
    const response = await adsDb.findById({ id });
    if (!response) {
      return { count: 0, message: "No ad found with that id." };
    }
    return { count: 1, message: "Ad found.", ad: response };
  };
};
