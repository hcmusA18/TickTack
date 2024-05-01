import { UserService } from "@services";
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

  getAllUserIds = async (_req: Request, res: Response) => {
    try {
      const userIds = await UserService.getInstance().getAllUserIds();
      res.status(200).json({ userIds });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: `Error when getting all user ids: ${_error.message}`,
      });
    }
  };
}

export { UserController };
