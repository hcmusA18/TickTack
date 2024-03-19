import userService from "../services/user.service";
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
    const { username, password } = req.body as {
      username?: string;
      password?: string;
    };
    try {
      const user = await userService.addNewUser(username ?? "", password ?? "");
      res
        .status(201)
        .json({ message: `Sign up successfully! Welcome ${user.username}!` });
    } catch (error) {
      res.status(500).json({ message: `Error when signing up: ${error}` });
    }
  };
}

export default AuthController.getInstance();
