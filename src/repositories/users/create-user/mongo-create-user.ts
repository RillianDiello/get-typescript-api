import {
  ICreateUserParams,
  ICreateUserRepository,
} from "../../../controllers/users/create-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { IUser } from "../../../models/user";
import { MongoUser, formatUser } from "../../mongo-protocols";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: ICreateUserParams): Promise<IUser> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    return formatUser(user);
  }
}
