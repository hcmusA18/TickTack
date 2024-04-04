import express from "express";
import VideoController from "../controllers/video.controller";

const router = express.Router();

router.post("/upload", (req, res) => {
  VideoController.getInstance().uploadVideo(req, res);
});

export default router;
