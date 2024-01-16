import { IUser } from "../../../models/user";
import { HttpEnumStatusCode } from "../../protocols";
import { GetUsersController } from "./get-users";
import { IGetUsersRepository } from "./protocols";

class GetUsersRepositoryMock implements IGetUsersRepository {
  async getUsers(): Promise<IUser[]> {
    return Promise.resolve([]);
  }
}

describe("GetUsersController", () => {
  it("should return 200 if getUsersRepository found users", async () => {
    const controller = new GetUsersController(new GetUsersRepositoryMock());
    const response = await controller.handle();

    expect(response.statusCode).toBe(HttpEnumStatusCode.OK);
  });
  it("should return 500 throws an error", async () => {
    const errorMockRepository: IGetUsersRepository = {
      async getUsers(): Promise<IUser[]> {
        throw new Error("Simulated error");
      },
    };
    const constroller = new GetUsersController(errorMockRepository);
    const response = await constroller.handle();
    expect(response.statusCode).toEqual(HttpEnumStatusCode.SERVER_ERROR);
    expect(response.body).toEqual("Somethins went wrong");
  });
});
