import { SocialService } from "@services";
import { Request, Response } from "express";

class SocialController {
  private static instance: SocialController | null = null;

  private constructor() {
    // do something
  }

  static getInstance(): SocialController {
    if (SocialController.instance === null) {
      SocialController.instance = new SocialController();
    }
    return SocialController.instance;
  }

  getFollowing = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    try {
      const following = await SocialService.getInstance().getFollowing(userId);
      res.status(200).json(following);
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: _error.message,
      });
    }
  };

  getUnfollowing = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const isFollower = req.query.isFollower === "true";

    try {
      const unfollowing = await SocialService.getInstance().getUnfollowing(
        userId,
        isFollower,
      );
      res.status(200).json(unfollowing);
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: _error.message,
      });
    }
  };

  getFollowers = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const isFollowBack = req.query.isFollowBack === "true";

    try {
      const followers = await SocialService.getInstance().getFollowers(
        userId,
        isFollowBack,
      );
      res.status(200).json(followers);
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: _error.message,
      });
    }
  };

  isFollowing = async (req: Request, res: Response) => {
    const { userId, checkId } = req.body;

    try {
      const isFollowing = await SocialService.getInstance().isFollowing(
        userId,
        checkId,
      );

      if (isFollowing) {
        res.status(200).json({
          message: "Following",
        });
      } else {
        res.status(200).json({
          message: "Not following",
        });
      }
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: _error.message,
      });
    }
  };

  follow = async (req: Request, res: Response) => {
    const { userId, followId } = req.body;

    try {
      const isFollowed = await SocialService.getInstance().follow(
        userId,
        followId,
      );

      if (isFollowed) {
        res.status(200).json({
          message: "Followed successfully",
        });
      } else {
        res.status(200).json({
          message: "failed to follow",
        });
      }
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: _error.message,
      });
    }
  };

  unfollow = async (req: Request, res: Response) => {
    const { userId, unfollowId } = req.body;

    try {
      const isUnfollowed = await SocialService.getInstance().unfollow(
        userId,
        unfollowId,
      );

      if (isUnfollowed) {
        res.status(200).json({
          message: "Unfollowed successfully",
        });
      } else {
        res.status(404).json({
          message: "The user is not followed yet",
        });
      }
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: _error.message,
      });
    }
  };

  getNumFollowers = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (userId === undefined || userId === "") {
      res.status(400).send("User ID is required");
    }

    const numFollowers = await SocialService.getInstance().countFollowers(
      parseInt(userId),
    );

    res.status(200).json({ data: numFollowers });
  };

  getNumFollowing = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    if (userId === undefined || userId === "") {
      res.status(400).send("User ID is required");
    }

    const numFollowing = await SocialService.getInstance().countFollowing(
      parseInt(userId),
    );

    res.status(200).json({ data: numFollowing });
  };
}

export { SocialController };
