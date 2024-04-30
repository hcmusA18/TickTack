import "module-alias/register";
import { AuthController } from "@controllers";
import { Request, Response } from "express";
import passport from "passport";
import "jsonwebtoken";
import { UserService } from "@services";
import { UserModel } from "@models";

jest.mock("@services/user.service", () => ({
  UserService: {
    getInstance: jest.fn(() => ({
      addNewUser: jest.fn(),
    })),
  },
}));

jest.mock("passport", () => ({
  authenticate: jest.fn(
    (
      _: string,
      callback: (err: Error | null, user: UserModel | null, info: any) => void,
    ) =>
      () => {
        callback(null, {} as UserModel, {});
      },
  ),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mockedToken"),
}));

describe("AuthController", () => {
  let authController: AuthController;
  let mockedUserService: UserService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    authController = AuthController.getInstance();

    mockedUserService = {
      addNewUser: jest.fn(),
    } as unknown as UserService;
    jest.spyOn(UserService, "getInstance").mockReturnValue(mockedUserService);

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("signUpByEmail", () => {
    it("should sign up successfully", async () => {
      const email = "test@example.com";
      const password = "password";
      const user: UserModel = {
        userId: 1,
        username: "testUser",
        email,
        password,
        bio: "test bio",
        avatar: "test image",
        regisDate: 123456789,
      };

      (mockedUserService.addNewUser as jest.Mock).mockResolvedValueOnce(user);

      mockRequest.body = { email, password };

      await authController.signUpByEmail(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockedUserService.addNewUser).toHaveBeenCalledWith(
        email,
        password,
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: `Sign up successfully! Welcome ${email}!`,
      });
    });

    it("should handle sign up error", async () => {
      const errorMessage = "Sign up error";
      (mockedUserService.addNewUser as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage),
      );

      mockRequest.body = { email: "test@example.com", password: "password" };

      await authController.signUpByEmail(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: `Error when signing up: ${errorMessage}`,
      });
    });
  });

  describe("signIn", () => {
    it("should sign in successfully", async () => {
      const token = "mockedToken";

      mockRequest.logIn = jest.fn(
        (_: UserModel, callback: (err?: Error) => void) => callback(),
      ) as any;

      await authController.signIn(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: token });
    });

    it("should handle authentication failure", async () => {
      const errorMessage = "Authentication error";
      (passport.authenticate as jest.Mock).mockImplementationOnce(
        (
          _: string,
          callback: (
            err: Error | null,
            user: UserModel | null,
            info: any,
          ) => void,
        ) =>
          () => {
            callback(new Error(errorMessage), null, {});
          },
      );

      await authController.signIn(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });

    it("should handle missing user", async () => {
      const errorMessage = "Missing user";
      (passport.authenticate as jest.Mock).mockImplementationOnce(
        (
          _: string,
          callback: (
            err: Error | null,
            user: UserModel | null,
            info: any,
          ) => void,
        ) =>
          () => {
            callback(null, null, { message: errorMessage });
          },
      );

      await authController.signIn(
        mockRequest as Request,
        mockResponse as Response,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});
