import { IUser } from "../../../models/user";
import { HttpEnumStatusCode, IHttpRequest } from "../../protocols";
import { GetUserByIdController } from "./get-user-by-id";
import { IGetUserByIdRepository } from "./protocols";

class GetUserByIdRepositoryMock implements IGetUserByIdRepository {
  async getUser(id: string): Promise<IUser> {
    return Promise.resolve({
      id,
      firstName: "UpdatedFirstName",
      lastName: "UpdatedLastName",
      email: "updated.email@example.com",
      password: "updatedPassword123",
    });
  }
}

describe("GetUserByIdController", () => {
  const makeHttpRequest = (id: string): IHttpRequest<{ id: string }> => ({
    params: { id },
  });
  it("should return 200 if getUserByRepository found the user successfully", async () => {
    const controller = new GetUserByIdController(
      new GetUserByIdRepositoryMock()
    );
    const response = await controller.handle(makeHttpRequest("user-id"));
    expect(response.statusCode).toBe(HttpEnumStatusCode.OK);
  });
  it("should return 400 if user ID is missing", async () => {
    const controller = new GetUserByIdController(
      new GetUserByIdRepositoryMock()
    );
    const response = await controller.handle(makeHttpRequest(""));
    expect(response.statusCode).toEqual(HttpEnumStatusCode.BAD_REQUEST);
    expect(response.body).toEqual("Missing user Id");
  });
  it("should return 500 if get user by id throws an error", async () => {
    const errorMockRepository: IGetUserByIdRepository = {
      async getUser(id: string): Promise<IUser> {
        throw new Error(`Simulated error with id: ${id}`);
      },
    };
    const controller = new GetUserByIdController(errorMockRepository);
    const response = await controller.handle(makeHttpRequest("user-id"));

    expect(response.statusCode).toEqual(HttpEnumStatusCode.SERVER_ERROR);
    expect(response.body).toEqual("Somethins went wrong");
  });
});
