const makeUser = require("./index");
const makeFakeUser = require("../../__test__/fixtures/user");

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
    const title1="11111";
    const title2="22222";
    user.addNotification({title:title1})
    user.addNotification({title:title2})
    expect(user.getNotifications()).toMatchObject([`Ad ${title1} is no longer available `,`Ad ${title2} is no longer available `]);
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

  

});
