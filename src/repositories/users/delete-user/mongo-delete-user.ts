import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../../controllers/users/delete-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { IUser } from "../../../models/user";
import { MongoUser, formatUser } from "../../mongo-protocols";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<IUser> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error(`User ${id} not found`);
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted");
    }

    return formatUser(user);
  }
}
