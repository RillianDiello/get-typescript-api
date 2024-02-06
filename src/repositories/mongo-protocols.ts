import { WithId } from "mongodb";
import { IUser } from "../models/user";

export type MongoUser = Omit<IUser, "id">;

export const formatUser = (user: WithId<MongoUser>): IUser => {
  const { _id, ...rest } = user;
  return { id: _id.toHexString(), ...rest };
};
