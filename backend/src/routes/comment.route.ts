import express, { Request, Response } from "express";
import { CommentService } from "@services";

const commentRouter = express.Router();
const commentService = CommentService.getInstance();

// Add a comment
commentRouter.post("/comments", async (req: Request, res: Response) => {
  try {
    const { userId, videoId, commentText, time } = req.body;
    const comment = await commentService.addComment(
      userId,
      videoId,
      commentText,
      BigInt(time),
    );
    res.status(201).json(comment);
  } catch (error) {
    const _error = error as Error;
    res.status(500).json({ error: _error.message });
  }
});

// Get comments for a video
commentRouter.get("/comments/:videoId", async (req: Request, res: Response) => {
  try {
    const videoId = parseInt(req.params.videoId);
    const comments = await commentService.getCommentsByVideoId(videoId);
    res.status(200).json(comments);
  } catch (error) {
    const _error = error as Error;
    res.status(500).json({ error: _error.message });
  }
});

// // Update a comment
// router.put('/comments/:commentId', async (req: Request, res: Response) => {
//   try {
//     const commentId = parseInt(req.params.commentId);
//     const { commentText } = req.body;
//     const updatedComment = await commentService.updateComment(commentId, commentText);
//     if (updatedComment) {
//       res.status(200).json(updatedComment);
//     } else {
//       res.status(404).json({ message: 'Comment not found' });
//     }
//   } catch (error) {
//     const _error = error as Error;
//     res.status(500).json({ error: _error.message });
//   }
// });

// Delete a comment
commentRouter.delete("/comments", async (req: Request, res: Response) => {
  try {
    const { user_id, video_id } = req.body;
    const success = await commentService.deleteComment(user_id, video_id, 1);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    const _error = error as Error;
    res.status(500).json({ error: _error.message });
  }
});

// Count comments for a video
commentRouter.get(
  "/comments/count/:videoId",
  async (req: Request, res: Response) => {
    try {
      const videoId = parseInt(req.params.videoId);
      const count = await commentService.getCommentsByVideoId(videoId);
      res.status(200).json({ videoId, count });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({ error: _error.message });
    }
  },
);

export { commentRouter };
