const makeDb = require("../../__test__/fixtures/db");
const makeUsersDb = require("./users-db");
const makeFakeUser = require("../../__test__/fixtures/user");

describe("add dbs", () => {
  let usersDb;
  beforeEach(async () => {
    usersDb = await makeUsersDb({ makeDb });
  });
  afterEach(async () => {
    await usersDb.dropDatabase();
  });

  it("inserts a User", async () => {
    const user = makeFakeUser();
    const result = await usersDb.insert(user);
    return expect(result).toEqual(user);
  });

  it("deletes a user", async () => {
    const user = makeFakeUser(); 
    await usersDb.insert(user);
    return expect(await usersDb.remove(user)).toBe(1);
  });
  it("deletes a non existing  user", async () => {
    const user = makeFakeUser();  
    return expect(await usersDb.remove(user)).toBe(0);
  });

  it("updates a user successfuly", async () => {
    const user = makeFakeUser();
    await usersDb.insert(user);
    user.name = "changed";
    const updated = await usersDb.update(user);
    expect(updated.name).toBe("changed");
  });
  
  it("finds all  Users", async () => {
    const user1 = makeFakeUser();
    const user2 = makeFakeUser();
    await usersDb.insert(user1);
    await usersDb.insert(user2);
    const result = await usersDb.findAll();
    return expect(result).toEqual([user1,user2]);
  });
  
  it("finds all  Users with conditions works", async () => {
    const user1 = makeFakeUser();
    const user2 = makeFakeUser();
    await usersDb.insert(user1);
    await usersDb.insert(user2);
    const result = await usersDb.findAll({name:user1.name});
    return expect(result).toEqual([user1]);
  });
  
  it("finds Users by id works", async () => {
    const user = makeFakeUser();
    await usersDb.insert(user);
    const result = await usersDb.findById({id:user.id});
    return expect(result).toEqual(user);
  });

  it("finds Users by id returns null when is no user with that id", async () => {
    const user = makeFakeUser();
    const result = await usersDb.findById({id:user.id});
    return expect(result).toEqual(null);
  });
  
  
});
