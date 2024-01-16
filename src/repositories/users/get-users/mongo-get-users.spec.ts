import { MongoClient } from "../../../database/mongo";
import { MongoGetUsersRepository } from "./mongo-get-users";

describe("MongoGetUsersRepository", () => {
  beforeAll(async () => {
    await MongoClient.connect();
  });

  afterAll(async () => {
    await MongoClient.disconnect();
  });
  it("should return a users from db", async () => {
    const testUser1 = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    };
    await MongoClient.db.collection("users").insertOne(testUser1);
    const testUser2 = {
      firstName: "John2",
      lastName: "Doe2",
      email: "john.doe2@example.com",
      password: "password456",
    };
    await MongoClient.db.collection("users").insertOne(testUser2);

    const repository = new MongoGetUsersRepository();
    const users = await repository.getUsers();
    const user1Exists = users.some((user) => user.email === testUser1.email);
    const user2Exists = users.some((user) => user.email === testUser2.email);
    expect(user1Exists).toBeTruthy();
    expect(user2Exists).toBeTruthy();
  });
});
