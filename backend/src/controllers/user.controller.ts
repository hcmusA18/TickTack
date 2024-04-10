import { Request, Response } from "express";
import UserService from "../services/user.service";

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

  updateUserProfile = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const userData = req.body;

    if (userId === undefined || userId === "") {
      res.status(400).send("User ID is required");
    }

    const result = await UserService.getInstance().updateUser(userId, userData);

    if (result === null) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(userId);
    }
  };
}

export default UserController;
