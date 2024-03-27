import UserService from "../../src/services/user.service";
import UserModel from "../../src/models/user.model";
import { hashPassword } from "../../src/services/password.service";

jest.mock("../../src/models/user.model", () => ({
  getInstance: jest.fn(() => ({
    getUserByUsername: jest.fn(),
    getUserByEmail: jest.fn(),
    addNewUser: jest.fn(),
  })),
}));

jest.mock("../../src/services/password.service", () => ({
  hashPassword: jest.fn(),
}));

describe("UserService", () => {
  let userService: UserService;
  let mockedUserModel: UserModel;

  beforeEach(() => {
    mockedUserModel = {
      getUserByUsername: jest.fn(),
      getUserByEmail: jest.fn(),
      addNewUser: jest.fn(),
    } as unknown as UserModel;
    jest.spyOn(UserModel, "getInstance").mockReturnValue(mockedUserModel);

    userService = UserService.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get user by username", async () => {
    const mockedUser = { id: 1, username: "testUser", password: "password" };
    (mockedUserModel.getUserByUsername as jest.Mock).mockResolvedValueOnce(
      mockedUser,
    );

    const result = await userService.getUserByUsername("testUser");

    expect(result).toEqual(mockedUser);
    expect(mockedUserModel.getUserByUsername).toHaveBeenCalledWith("testUser");
  });

  it("should get user by email", async () => {
    const mockedUser = {
      id: 1,
      email: "testUser@example.com",
      password: "password",
    };
    (mockedUserModel.getUserByEmail as jest.Mock).mockResolvedValueOnce(
      mockedUser,
    );

    const result = await userService.getUserByEmail("testUser@example.com");

    expect(result).toEqual(mockedUser);
    expect(mockedUserModel.getUserByEmail).toHaveBeenCalledWith(
      "testUser@example.com",
    );
  });

  it("should add a new user", async () => {
    const email = "testUser@example.com";
    const password = "password";
    const hashedPassword = "hashedPassword";

    (mockedUserModel.getUserByEmail as jest.Mock).mockResolvedValueOnce(null);

    (hashPassword as jest.Mock).mockResolvedValueOnce(hashedPassword);

    const newUser = { id: 1, email, password: hashedPassword };
    (mockedUserModel.addNewUser as jest.Mock).mockResolvedValueOnce(newUser);

    const result = await userService.addNewUser(email, password);

    expect(result).toEqual(newUser);
    expect(mockedUserModel.getUserByEmail).toHaveBeenCalledWith(email);
    expect(hashPassword).toHaveBeenCalledWith(password);
    expect(mockedUserModel.addNewUser).toHaveBeenCalledWith(
      email,
      hashedPassword,
    );
  });

  it("should throw an error if email already exists when adding a new user", async () => {
    (mockedUserModel.getUserByEmail as jest.Mock).mockResolvedValueOnce({
      id: 1,
    });

    const email = "testUser@example.com";
    const password = "password";

    await expect(userService.addNewUser(email, password)).rejects.toThrow(
      "Email already exist",
    );
  });

  it("should throw an error if an error occurs when getting user by username", async () => {
    const errorMessage = "Test error";
    (mockedUserModel.getUserByUsername as jest.Mock).mockRejectedValueOnce(
      errorMessage,
    );

    const username = "testUser";

    await expect(userService.getUserByUsername(username)).rejects.toThrow(
      `Error when getting user by username: ${errorMessage}`,
    );
  });

  it("should throw an error if an error occurs when getting user by email", async () => {
    const errorMessage = "Test error";
    (mockedUserModel.getUserByEmail as jest.Mock).mockRejectedValueOnce(
      errorMessage,
    );

    const email = "testUser@example.com";

    await expect(userService.getUserByEmail(email)).rejects.toThrow(
      `Error when getting user by email: ${errorMessage}`,
    );
  });

  it("should throw an error if an error occurs when adding a new user", async () => {
    const errorMessage = "Test error";
    (mockedUserModel.getUserByEmail as jest.Mock).mockResolvedValueOnce(null);

    (hashPassword as jest.Mock).mockResolvedValueOnce("hashedPassword");

    (mockedUserModel.addNewUser as jest.Mock).mockRejectedValueOnce(
      errorMessage,
    );

    const email = "testUser@example.com";

    await expect(userService.addNewUser(email, "password")).rejects.toThrow(
      `Error when adding a new user: ${errorMessage}`,
    );
  });
});
