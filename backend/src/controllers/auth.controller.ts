import UserService from "../services/user.service";
import { Request, Response } from "express";

class AuthController {
  private static instance: AuthController | null = null;

  private constructor() {
    // do something
  }

  static getInstance(): AuthController {
    if (AuthController.instance === null) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  signUpByEmail = async (req: Request, res: Response) => {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };
    try {
      const user = await UserService.getInstance().addNewUser(
        email ?? "",
        password ?? "",
      );
      res
        .status(201)
        .json({ message: `Sign up successfully! Welcome ${user.email}!` });
    } catch (error) {
      const _error = error as Error;
      res
        .status(500)
        .json({ message: `Error when signing up: ${_error.message}` });
    }
  };

  // signIn = async (req: Request, res: Response) => {
  //   res.status(200).json({ res });
  // };
}

export default AuthController;
