import { ObjectId } from "mongodb";
import { IGetUserByIdRepository } from "../../../controllers/users/get-user-by-id/protocols";
import { MongoClient } from "../../../database/mongo";
import { IUser } from "../../../models/user";
import { MongoUser } from "../../mongo-protocols";

export class MongoGetUserByIdRepository implements IGetUserByIdRepository {
  async getUser(id: string): Promise<IUser> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new Error("User not found");
    }
    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
