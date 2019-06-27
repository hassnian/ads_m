const makeUser = require("./index");
const makeFakeUser = require("../../__test__/fixtures/user");
const makeFakeAd = require("../../__test__/fixtures/ad");

describe("user test", () => {
  it("does  throw an error when there is NOT a title", () => {
    const user = makeFakeUser({ name: null });
    expect(() => makeUser(user)).toThrow("User must have a name");
  });

  it("does NOT throw an error when there is a title", () => {
    const user = makeFakeUser({ name: "Hassnian" });
    expect(() => makeUser(user)).not.toThrow("User must have a name");
  });


    it("cant have an invalid id", () => {
    const user = makeFakeUser({ id: "invalid" });
    expect(() => makeUser(user)).toThrow("User must have a valid id.");
    const noId = makeFakeUser({ id: undefined });
    expect(() => makeUser(noId)).not.toThrow("User must have a valid id.");
  });
  it("can create an id", () => {
    const noId = makeFakeUser({ id: undefined });
    const user = makeUser(noId);
    expect(user.getId()).toBeDefined();
  });
  it("getId returns correct id", () => {
    const fakeUser = makeFakeUser();
    const user = makeUser(fakeUser);
    expect(user.getId()).toBe(fakeUser.id);
  });

    it("can create a Date", () => {
    const noCreatedOn = makeFakeUser({ createdOn: undefined });
    const user = makeUser(noCreatedOn);
    expect(user.getCreatedOn()).toBeDefined();
  });
  it("getCreatedOn returns correct date", () => {
    const fakeUser = makeFakeUser();
    const user = makeUser(fakeUser);
    expect(user.getCreatedOn()).toBe(fakeUser.createdOn);
  });


  it("getFavourites returns correct favourite", () => {
    const fakeUser = makeFakeUser();
    const user = makeUser(fakeUser);
    expect(user.getFavourites()).toMatchObject([]);
  });
  it("addFavourite pushes id into the array ", () => {
    const fakeUser = makeFakeUser();
    const user = makeUser(fakeUser);
    user.addFavourite("exmpaleID123")
    user.addFavourite("exmpaleID321")
    expect(user.getFavourites()).toMatchObject(["exmpaleID123","exmpaleID321"]);
  });

  it("getNotifications returns correct date", () => {
    const fakeUser = makeFakeUser();
    const user = makeUser(fakeUser);
    expect(user.getNotifications()).toMatchObject([]);
  });
  it("addNotification pushes the msg into the array ", () => {
    const fakeUser = makeFakeUser();
    const user = makeUser(fakeUser);
    const ad1=makeFakeAd();
    const ad2=makeFakeAd()
    user.addNotification(ad1)
    user.addNotification(ad2)
    expect(user.getNotifications()).toMatchObject([`Ad ${ad1.title} is no longer available `,`Ad ${ad2.title} is no longer available `]);
  });

  it("checkIfIsAlreadyFavourited return true when an id is already in the array  ", () => {
    const fakeUser = makeFakeUser();
    const user = makeUser(fakeUser);
    user.addFavourite("123")
    const response=user.checkIfIsAlreadyFavourited("123")
    expect(response).toBe(true);
  });
  it("checkIfIsAlreadyFavourited return false when an id is  NOT already in the array  ", () => {
    const fakeUser = makeFakeUser();
    const user = makeUser(fakeUser);
    user.addFavourite("123")
    const response=user.checkIfIsAlreadyFavourited("321")
    expect(response).toBe(false);
  });

  it("can  remove an favourite from ", () => {
    const fakeUser = makeFakeUser();
    const user = makeUser(fakeUser);
    const id1="exmpaleID123"
    const id2="exmpaleID321"
    user.addFavourite(id1)
    user.addFavourite(id2)
    user.removeFavourite(id1)
    expect(user.getFavourites()).toMatchObject([id2]);
  });
  
  it("it can remove all favourites  ", () => {
    const fakeUser = makeFakeUser();
    const user = makeUser(fakeUser);
    const id1="exmpaleID123"
    const id2="exmpaleID321"
    user.addFavourite(id1)
    user.addFavourite(id2)
    expect(user.getFavourites()).toMatchObject([id1,id2]);
    user.removeAllFavourites();
    expect(user.getFavourites()).toMatchObject([]);
  });

});
