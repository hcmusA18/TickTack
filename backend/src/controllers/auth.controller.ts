import UserService from "../services/user.service";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import passport from "passport";
import jwt from "jsonwebtoken";
import { log } from "console";

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
      const user = (await UserService.getInstance().addNewUser(
        email ?? "",
        password ?? "",
      )) as UserModel;
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

  signIn = async (req: Request, res: Response) => {
    log("Sign in");
    passport.authenticate("local", (err: Error, user: UserModel, info: any) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }

        const token = jwt.sign(
          { user },
          process.env.JWT_SECRET || "default_jwt_secret",
          { expiresIn: "1h" },
        );

        return res.status(200).json({ token });
      });

      return;
    })(req, res);
  };
}

export default AuthController;
