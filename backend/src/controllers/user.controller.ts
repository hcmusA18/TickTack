import { UserService, SocialService } from "@services";
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

  getUserCommentInfo = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);

    try {
      const result = await UserService.getInstance().getUserCommentInfo(userId);
      res.status(200).json({ result });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: `Error when getting user comment info: ${_error.message}`,
      });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (userId === undefined || userId === "") {
      res.status(400).send("User ID is required");
    }

    const user = await UserService.getInstance().getUserById(userId);

    if (user === null) {
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).json(user);
    }
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

  getUsersByKeyword = async (req: Request, res: Response) => {
    const keyword = req.params.keyword;
    const getFull = req.query.getFull === "true";
    try {
      const users = await UserService.getInstance().getUsersByKeyword(
        keyword,
        getFull,
      );

      if (getFull) {
        // Count the number of followers for each user and add it to the response by an array
        const numFollowers: number[] = [];

        for (const user of users) {
          const userId = user.userId ?? 0; // Provide a default value for user.userId if it is undefined

          numFollowers.push(
            await SocialService.getInstance().countFollowers(userId),
          );
        }

        res.status(200).json({ users, numFollowers });
        return;
      }

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
