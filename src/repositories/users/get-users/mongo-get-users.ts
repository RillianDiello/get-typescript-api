import { IGetUsersRepository } from "../../../controllers/users/get-users/protocols";
import { MongoClient } from "../../../database/mongo";
import { IUser } from "../../../models/user";
import { MongoUser, formatUser } from "../../mongo-protocols";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<IUser[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .find({})
      .toArray();

    return users.map((user) => {
      return formatUser(user);
    });
  }
}
