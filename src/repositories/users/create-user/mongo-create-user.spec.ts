import { MongoClient } from "../../../database/mongo";
import { MongoCreateUserRepository } from "./mongo-create-user";

describe("MongoCreateUserRepository", () => {
  beforeAll(async () => {
    // connect with db
    await MongoClient.connect();
  });

  afterAll(async () => {
    await MongoClient.disconnect();
  });

  it("should create a user in the database", async () => {
    const repository = new MongoCreateUserRepository();
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    };
    const createdUser = await repository.createUser(userData);
    expect(createdUser).toHaveProperty("id");
    expect(createdUser.firstName).toBe(userData.firstName);
    expect(createdUser.lastName).toBe(userData.lastName);
    expect(createdUser.email).toBe(userData.email);
  });
});
