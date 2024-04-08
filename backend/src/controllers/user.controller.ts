import { Request, Response } from "express";

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

  getUserDetail = async (_: Request, res: Response) => {
    res.send("Getting users from database");
  };
}

export { UserController };
