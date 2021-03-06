const makeAd = require("./index");
const makeFakeAd = require("../../__test__/fixtures/ad");

describe("ad", () => {
  it("does  throw an error when there is NOT a title", () => {
    const ad = makeFakeAd({ title: null });
    expect(() => makeAd(ad)).toThrow("Ad must have a title");
  });

  it("does NOT throw an error when there is a title", () => {
    const ad = makeFakeAd();
    expect(() => makeAd(ad)).not.toThrow("Ad must have a title");
  });

  it("does  throw an error when there is NOT a description", () => {
    const ad = makeFakeAd({ description: null });
    expect(() => makeAd(ad)).toThrow("Ad must have description");
  });

  it("does NOT throw an error when there is a description", () => {
    const ad = makeFakeAd();
    expect(() => makeAd(ad)).not.toThrow("Ad must have description");
  });

  it("does throw an error when titles is  longer than 50", () => {
    const ad = makeFakeAd({
      title: "asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasda"
    });
    expect(() => makeAd(ad)).toThrow("Title cannot be bigger than 50");
  });

  it("does NOT throw an error when titles is NOT longer than 50", () => {
    const ad = makeFakeAd({ title: "not longer" });
    expect(() => makeAd(ad)).not.toThrow("Title cannot be bigger than 50");
  });

  it("does throw an error when Title and description are the same ", () => {
    const ad = makeFakeAd({ title: "same", description: "same" });
    expect(() => makeAd(ad)).toThrow(
      "Title and description cannot be the same"
    );
  });

  it("does NOT throw an error when Title and description are NOT the same ", () => {
    const ad = makeFakeAd({ title: "not", description: "same" });
    expect(() => makeAd(ad)).not.toThrow(
      "Title and description cannot be the same"
    );
  });



  it("can have an id", () => {
    const ad = makeFakeAd({ id: "invalid" });
    expect(() => makeAd(ad)).toThrow("Ad must have a valid id.");
    const noId = makeFakeAd({ id: undefined });
    expect(() => makeAd(noId)).not.toThrow("Ad must have a valid id.");
  });
  it("can create an id", () => {
    const noId = makeFakeAd({ id: undefined });
    const ad = makeAd(noId);
    expect(ad.getId()).toBeDefined();
  });

  it("can create a Date", () => {
    const noCreatedOn = makeFakeAd({ createdOn: undefined });
    const ad = makeAd(noCreatedOn);
    expect(ad.getCreatedOn()).toBeDefined();
  });

  it("getTitle returns correct title", () => {
    const fakeAd = makeFakeAd();
    const ad = makeAd(fakeAd);
    expect(ad.getTitle()).toBe(fakeAd.title);
  });
  it("getDescription returns correct description", () => {
    const fakeAd = makeFakeAd();
    const ad = makeAd(fakeAd);
    expect(ad.getDescription()).toBe(fakeAd.description);
  });
  it("getId returns correct id", () => {
    const fakeAd = makeFakeAd();
    const ad = makeAd(fakeAd);
    expect(ad.getId()).toBe(fakeAd.id);
  });
  it("getCreatedOn returns correct date", () => {
    const fakeAd = makeFakeAd();
    const ad = makeAd(fakeAd);
    expect(ad.getCreatedOn()).toBe(fakeAd.createdOn);
  });

  it("isExpired returns correct date", () => {
    const fakeAd = makeFakeAd();
    const ad = makeAd(fakeAd);
    expect(ad.isExpired()).toBe(false);
  });

  it("expire turns ad expired", () => {
    const fakeAd = makeFakeAd();
    const ad = makeAd(fakeAd);
    ad.expire()
    expect(ad.isExpired()).toBe(true);
  });
  it("unexpires turns ad unexpired", () => {
    const fakeAd = makeFakeAd();
    const ad = makeAd(fakeAd);
    ad.expire()
    expect(ad.isExpired()).toBe(true);
    ad.unexpire();
    expect(ad.isExpired()).toBe(false);

  });

  it("getFavourites returns correct favourite", () => {
    const fakeAd = makeFakeAd();
    const ad = makeAd(fakeAd);
    expect(ad.getFavourites()).toMatchObject([]);
  });
  it("addFavourite pushes id into the array ", () => {
    const fakeAd = makeFakeAd();
    const ad = makeAd(fakeAd);
    const id1="exmpaleID123"
    const id2="exmpaleID321"
    ad.addFavourite(id1)
    ad.addFavourite(id2)
    expect(ad.getFavourites()).toMatchObject([id1,id2]);
  });
  it("can remove from favourite pushes id into the array ", () => {
    const fakeAd = makeFakeAd();
    const ad = makeAd(fakeAd);
    const id1="exmpaleID123"
    const id2="exmpaleID321"
    ad.addFavourite(id1)
    ad.addFavourite(id2)
    ad.removeFavourite(id1)
    expect(ad.getFavourites()).toMatchObject([id2]);
  });
  
  it("it can remove all favourites  ", () => {
    const fakeAd = makeFakeAd();
    const ad = makeAd(fakeAd);
    const id1="exmpaleID123"
    const id2="exmpaleID321"
    ad.addFavourite(id1)
    ad.addFavourite(id2)
    expect(ad.getFavourites()).toMatchObject([id1,id2]);
    ad.removeAllFavourites();
    expect(ad.getFavourites()).toMatchObject([]);
  });
});
