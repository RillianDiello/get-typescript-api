import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";

import { MongoDeleteUserRepository } from "./mongo-delete-user";
describe("MongoCreateUserRepository", () => {
  beforeAll(async () => {
    await MongoClient.connect();
  });

  afterAll(async () => {
    await MongoClient.disconnect();
  });

  it("should delete a user from the database", async () => {
    const testUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(testUser);

    const repository = new MongoDeleteUserRepository();

    const deletedUser = await repository.deleteUser(insertedId.toHexString());

    expect(deletedUser).toHaveProperty("id");
    expect(deletedUser.firstName).toBe(testUser.firstName);
    expect(deletedUser.lastName).toBe(testUser.lastName);
    expect(deletedUser.email).toBe(testUser.email);

    const userAfterDeletion = await MongoClient.db
      .collection("users")
      .findOne({ _id: new ObjectId(insertedId.toHexString()) });

    expect(userAfterDeletion).toBeNull();
  });
  it("should throw an error if the user to be deleted is not found", async () => {
    const repository = new MongoDeleteUserRepository();
    const id = "3f3559a5e9abcdef12345678";

    await expect(repository.deleteUser(id)).rejects.toThrow(
      `User ${id} not found`
    );
  });
  it("should throw an error if the user to be deleted is not found", async () => {
    const repository = new MongoDeleteUserRepository();
    const id = "3f3559a5e9abcdef12345678";

    await expect(repository.deleteUser(id)).rejects.toThrow(
      `User ${id} not found`
    );
  });
});
