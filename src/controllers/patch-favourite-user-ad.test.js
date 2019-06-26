const { patchFavouriteUserAd } = require("./index");
describe("favoutite user ad controller", () => {
  it("unsuccessfully favoutites an  ad", async () => {
    const request = {
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        userId: "fakeUser.id",
        adId: "fakeAd.id"
      }
    };
    const expected = {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 404,
      body: {
        favourited: {
          success: false,
          message: "Didnt find an user with the provided id"
        }
      }
    };
    const actual = await patchFavouriteUserAd(request);
    expect(actual).toEqual(expected);
  });
});
