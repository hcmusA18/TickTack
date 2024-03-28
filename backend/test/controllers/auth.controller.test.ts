import AuthController from "../../src/controllers/auth.controller";
import UserService from "../../src/services/user.service";
import { Request, Response } from "express";

describe("AuthController", () => {
  let authController: AuthController;
  let mockedUserService: UserService;

  beforeEach(() => {
    mockedUserService = {
      addNewUser: jest.fn(),
    } as unknown as UserService;
    jest.spyOn(UserService, "getInstance").mockReturnValue(mockedUserService);

    authController = AuthController.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should sign up a user successfully", async () => {
    const req = {
      body: { email: "testUser@example.com", password: "testPassword" },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockedUser = { email: "testUser@example.com" };
    (mockedUserService.addNewUser as jest.Mock).mockResolvedValueOnce(
      mockedUser,
    );

    await authController.signUpByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `Sign up successfully! Welcome ${mockedUser.email}!`,
    });
  });

  it("should handle error when signing up", async () => {
    const req = {
      body: { email: "testUser@example.com", password: "testPassword" },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const errorMessage = "Test error";
    (mockedUserService.addNewUser as jest.Mock).mockRejectedValueOnce(
      errorMessage,
    );

    await authController.signUpByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: `Error when signing up: ${errorMessage}`,
    });
  });
});
