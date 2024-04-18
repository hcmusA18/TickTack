import express from "express";
import { VideoController } from "@controllers";

const router = express.Router();

router.post("/upload", (req, res) => {
  VideoController.getInstance().uploadVideo(req, res);
});

router.get("/:video_id", (req, res) => {
  VideoController.getInstance().getVideoById(req, res);
});

router.get("/:video_id", (req, res) => {
  VideoController.getInstance().getVideoById(req, res);
});

router.post("/privacy", (req, res) => {
  VideoController.getInstance().setPrivacy(req, res);
});

router.delete("/remove/:videoId", (req, res) => {
  VideoController.getInstance().removeVideo(req, res);
});

export { router as videoRouter };
