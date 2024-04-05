import express, { json } from "express";
import RecSysController from "../controllers/recsys.controller";
import axios from "axios";
import VideoService from "../services/video.service";

const router = express.Router();

router.get("/user/:userId", (req, res) => {
  RecSysController.getInstance().getRecommendation(req, res);
});

router.get("/video/:videoId", async (req, res) => {
  try {
    const idReq = await VideoService.getInstance().getVideoById(
      parseInt(req.params.videoId),
    );
    const videoUrl = idReq?.video_url ?? "";
    const response = await axios.get(videoUrl, { responseType: "stream" });
    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).send("Error fetching video");
  }
});

export default router;
