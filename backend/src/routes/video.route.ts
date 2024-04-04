import express from "express";
import VideoController from "../controllers/video.controller";

const router = express.Router();

router.post("/upload", (req, res) => {
  VideoController.getInstance().uploadVideo(req, res);
});

router.get("/:video_id", (req, res) => {
  VideoController.getInstance().getVideoById(req, res);
});

export default router;
