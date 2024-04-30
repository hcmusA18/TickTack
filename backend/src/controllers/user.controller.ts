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

  getUsersByKeyword = async (req: Request, res: Response) => {
    const keyword = req.params.keyword;
    const getFull = req.query.getFull === "true";
    try {
      const users = await UserService.getInstance().getUsersByKeyword(
        keyword,
        getFull,
      );
      res.status(200).json({ users });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: `Error when getting users by keyword: ${_error.message}`,
      });
    }
  };
}

export { UserController };
