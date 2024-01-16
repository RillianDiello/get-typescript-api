import { MongoClient } from "../../../database/mongo";
import { MongoUpdateUserRepository } from "./mongo-update-user";

describe("MongoUpdateUserRepository", () => {
  beforeAll(async () => {
    await MongoClient.connect();
  });

  afterAll(async () => {
    await MongoClient.disconnect();
  });

  it("should returno a updated user on db", async () => {
    const testUser1 = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
    };
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(testUser1);

    const repository = new MongoUpdateUserRepository();
    const userUpdated = await repository.updateUser(insertedId.toHexString(), {
      firstName: "JohnII",
      lastName: "DoeII",
    });

    expect(userUpdated.firstName).toBe("JohnII");
    expect(userUpdated.lastName).toBe("DoeII");
    expect(userUpdated.email).toBe(testUser1.email);
  });
});
