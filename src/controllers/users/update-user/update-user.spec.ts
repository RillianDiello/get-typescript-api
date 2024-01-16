import { HttpEnumStatusCode, IHttpRequest } from "../../protocols";
import { UpdateUserController } from "./update-user";
import { IUpdateUserParms, IUpdateUserRepository } from "./procotols";
import { IUser } from "../../../models/user";

class UpdateUserRepositoryMock implements IUpdateUserRepository {
  async updateUser(id: string, params: IUpdateUserParms): Promise<IUser> {
    return Promise.resolve({
      id,
      firstName: params.firstName || "UpdatedLastName",
      lastName: params.lastName || "UpdatedLastName",
      email: "updated.email@example.com",
      password: params.password || "updatedPassword123",
    });
  }
}
describe("UpdateUserController", () => {
  it("should return 200 if UpdateUserRepository works", async () => {
    const controller = new UpdateUserController(new UpdateUserRepositoryMock());
    const response = await controller.handle(
      makeUpdateHttpRequest("user-id", {
        firstName: "UpdatedFirstNameII",
      })
    );
    expect(response.statusCode).toBe(HttpEnumStatusCode.OK);
    if (isIUser(response.body)) {
      expect(response.body).toEqual({
        id: "user-id",
        firstName: "UpdatedFirstNameII",
        lastName: "UpdatedLastName",
        email: "updated.email@example.com",
        password: "updatedPassword123",
      });
    } else {
      fail("Response body is not of type IUser");
    }
  });
  it("should return 400 if body is missing", async () => {
    const controller = new UpdateUserController(new UpdateUserRepositoryMock());
    const response = await controller.handle(
      makeUpdateHttpRequest("", {
        firstName: "UpdatedFirstNameII",
      })
    );
    expect(response.statusCode).toEqual(HttpEnumStatusCode.BAD_REQUEST);
    expect(response.body).toEqual("Missing user Id");
  });
  it("should return 400 if body is missing", async () => {
    const controller = new UpdateUserController(new UpdateUserRepositoryMock());
    const response = await controller.handle(makeUpdateHttpRequest("", null));
    expect(response.statusCode).toEqual(HttpEnumStatusCode.BAD_REQUEST);
    expect(response.body).toEqual("Body missing fields");
  });
  it("should return 400 if Some received field is not allowed", async () => {
    const controller = new UpdateUserController(new UpdateUserRepositoryMock());
    const response = await controller.handle(
      makeUpdateHttpRequest("user-id", {
        firstName: "UpdatedFirstName",
        lastName: "UpdatedLastName",
        email: "updated.email@example.com",
        password: "updatedPassword123",
      })
    );
    expect(response.statusCode).toEqual(HttpEnumStatusCode.BAD_REQUEST);
    expect(response.body).toEqual("Some received field is not allowed");
  });
  it("should return 500 throws an error", async () => {
    const errorMockRepository: IUpdateUserRepository = {
      async updateUser(id, params): Promise<IUser> {
        throw new Error(
          `Simulated error with id: ${id} and params: ${JSON.stringify(params)}`
        );
      },
    };
    const constroller = new UpdateUserController(errorMockRepository);
    const response = await constroller.handle(
      makeUpdateHttpRequest("user-id", {
        firstName: "UpdatedFirstName",
        lastName: "UpdatedLastName",
        password: "updatedPassword123",
      })
    );
    expect(response.statusCode).toEqual(HttpEnumStatusCode.SERVER_ERROR);
    expect(response.body).toEqual("Somethins went wrong");
  });
});

function isIUser(obj: any): obj is IUser {
  return (
    "id" in obj &&
    "firstName" in obj &&
    "lastName" in obj &&
    "email" in obj &&
    "password" in obj
  );
}

function makeUpdateHttpRequest(
  id: string,
  updateParams: any
): IHttpRequest<IUser> {
  return {
    params: { id },
    body: updateParams,
  };
}
