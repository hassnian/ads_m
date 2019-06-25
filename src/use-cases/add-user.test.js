const makeAddUser = require("./add-user");
const makeUsersDb = require("../data-access/users-db");
const makeFakeUser = require("../../__test__/fixtures/user");
const makeDb = require("../../__test__/fixtures/db");

describe("add user", () => {
  let usersDb;
  beforeEach(() => {
    usersDb = makeUsersDb({ makeDb });
  });
  afterEach(async () => {
    await usersDb.dropDatabase();
  });

   it("inserts user in to the database", async () => {
    const newUser = makeFakeUser();
    const addUser = makeAddUser({ usersDb });
    const inserted = await addUser(newUser);
    expect(inserted).toMatchObject(newUser);
  });

  it("return the user if there is a user whith the id into  the database", async () => {
    const newUser = makeFakeUser();
    const addUser = makeAddUser({ usersDb });
    await addUser(newUser);
    const inserted = await addUser(newUser);
    expect(inserted).toMatchObject(newUser);
  });

  
});
