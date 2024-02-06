import { ObjectId } from "mongodb";
import {
  IUpdateUserParms,
  IUpdateUserRepository,
} from "../../../controllers/users/update-user/procotols";
import { MongoClient } from "../../../database/mongo";
import { IUser } from "../../../models/user";
import { MongoUser, formatUser } from "../../mongo-protocols";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: IUpdateUserParms): Promise<IUser> {
    await MongoClient.db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new Error("User not updated");
    }
    return formatUser(user);
  }
}
