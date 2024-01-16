import { IUser } from "../../../models/user";

export interface IUpdateUserParms {
  firstName?: string;
  lastName?: string;
  password?: string;
}
export interface IUpdateUserRepository {
  updateUser(id: string, params: IUpdateUserParms): Promise<IUser>;
}
