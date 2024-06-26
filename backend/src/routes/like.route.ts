import express, { Request, Response } from "express";
import { LikeService } from "@services"; // Adjust the path as necessary

const LikeRouter = express.Router();
const likeService = LikeService.getInstance();

// POST endpoint to add a like
LikeRouter.post("/likes", async (req: Request, res: Response) => {
  try {
    const like = await likeService.addLike(req.body);
    res.status(201).json(like);
  } catch (error) {
    const _error = error as Error;
    res.status(500).json({ error: _error.message });
  }
});

// DELETE endpoint to remove a like
LikeRouter.delete("/likes", async (req: Request, res: Response) => {
  try {
    const { user_id, video_id } = req.body;
    const success = await likeService.removeLike(user_id, video_id);
    if (success) {
      res.status(200).json({ message: "Like removed successfully" });
    } else {
      res.status(404).json({ message: "Like not found" });
    }
  } catch (error) {
    const _error = error as Error;
    res.status(500).json({ error: _error.message });
  }
});

// GET endpoint to count likes for a video
LikeRouter.get(
  "/likes/count/:video_id",
  async (req: Request, res: Response) => {
    try {
      const video_id = parseInt(req.params.video_id, 10);
      const count = await likeService.getAllLikes(video_id);
      res.status(200).json({ video_id: video_id, like_count: count });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({ error: _error.message });
    }
  },
);

// POST endpoint to add a dislike
LikeRouter.post("/dislikes", async (req: Request, res: Response) => {
  try {
    const dislike = await likeService.addDisLike(req.body);
    res.status(201).json(dislike);
  } catch (error) {
    const _error = error as Error;
    res.status(500).json({ error: _error.message });
  }
});

LikeRouter.get(
  "/likes/check/:videoId/:userId",
  async (req: Request, res: Response) => {
    try {
      const user_id = parseInt(req.params.userId, 10);
      const video_id = parseInt(req.params.videoId, 10);
      const isLiked = await likeService.checkLike(user_id, video_id);
      res.status(201).json({ status: isLiked });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({ error: _error.message });
    }
  },
);

// DELETE endpoint to remove a dislike
LikeRouter.delete("/dislikes", async (req: Request, res: Response) => {
  try {
    const { user_id, video_id } = req.body;
    const success = await likeService.removeDisLike(user_id, video_id);
    if (success) {
      res.status(200).json({ message: "Dislike removed successfully" });
    } else {
      res.status(404).json({ message: "Dislike not found" });
    }
  } catch (error) {
    const _error = error as Error;
    res.status(500).json({ error: _error.message });
  }
});

export { LikeRouter };
