import express from "express";
import multer from "multer";
import VideoController from "../controllers/video.controller";

const router = express.Router();
const upload = multer();

router.post("/upload", (req, res) => {
  VideoController.getInstance().uploadVideo(req, res);
});

export default router;
