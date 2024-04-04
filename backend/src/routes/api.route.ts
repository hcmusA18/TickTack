import express from "express";
import UserController from "../controllers/user.controller";
import VideoController from "../controllers/video.controller";

const router = express.Router();

router.get("/user/all_ids", (req, res) => {
  UserController.getInstance().getAllUserIds(req, res);
});

router.get("/video/:video_id", (req, res) => {
  VideoController.getInstance().getVideoById(req, res);
});

export default router;
