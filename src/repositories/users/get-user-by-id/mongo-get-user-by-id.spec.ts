import { MongoClient } from "../../../database/mongo";

import { MongoGetUserByIdRepository } from "./mongo-get-user-by-id";

describe("MongoGetUserByIdRepository", () => {
  beforeAll(async () => {
    await MongoClient.connect();
  });

  afterAll(async () => {
    await MongoClient.disconnect();
  });
  it("should return a user from db with an specificy id", async () => {
    const testUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(testUser);

    const repository = new MongoGetUserByIdRepository();
    const user = await repository.getUser(insertedId.toHexString());
    expect(user).toHaveProperty("id");
    expect(user.firstName).toBe(testUser.firstName);
    expect(user.lastName).toBe(testUser.lastName);
    expect(user.email).toBe(testUser.email);
  });
  it("should return erro when user not found", async () => {
    const id = "3f3559a5e9abcdef12345678";
    const repository = new MongoGetUserByIdRepository();
    await expect(repository.getUser(id)).rejects.toThrow(`User not found`);
  });
});
