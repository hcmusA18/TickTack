import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
  private static instance: UserController | null = null;

  private constructor() {
    // do something
  }

  static getInstance(): UserController {
    if (UserController.instance === null) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  getUserDetail = async (req: Request, res: Response) => {
    res.send("Getting users from database");
  };
}

export default UserController.getInstance();
