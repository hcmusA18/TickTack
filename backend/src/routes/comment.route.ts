import express from "express";
import { CommentService } from "@services";

const CommentRouter = express.Router();

// Post a new comment
CommentRouter.post("/comments", async (req, res) => {
  try {
    const { userId, videoId, commentText, time } = req.body;
    const result = await CommentService.addComment(
      userId,
      videoId,
      commentText,
      time,
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comments for a video
CommentRouter.get("/comments/:videoId", async (req, res) => {
  try {
    const videoId = parseInt(req.params.videoId);
    const comments = await CommentService.getVideoComments(videoId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a comment
CommentRouter.put("/comments", async (req, res) => {
  try {
    const { userId, videoId, time, commentText } = req.body;
    const result = await CommentService.updateComment(
      userId,
      videoId,
      time,
      commentText,
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a comment
CommentRouter.delete("/comments", async (req, res) => {
  try {
    const { userId, videoId, time } = req.body;
    const success = await CommentService.deleteComment(userId, videoId, time);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { CommentRouter };
