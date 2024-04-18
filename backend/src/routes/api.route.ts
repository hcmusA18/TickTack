import express from "express";
import { VideoController, UserController } from "@controllers";

const router = express.Router();

router.get("/user/all_ids", (req, res) => {
  UserController.getInstance().getAllUserIds(req, res);
});

router.get("/video/:video_id", (req, res) => {
  VideoController.getInstance().getVideoById(req, res);
});

export { router as apiRouter };
