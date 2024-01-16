import { IUser } from "../../../models/user";

export interface IGetUserByIdRepository {
  getUser(id: string): Promise<IUser>;
}
