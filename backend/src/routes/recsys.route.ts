import express from "express";
import RecSysController from "../controllers/recsys.controller";
import { VideoService } from "@services";

const router = express.Router();

router.get("/user/:userId", (req, res) => {
  RecSysController.getInstance().getRecommendation(req, res);
});

router.get("/video/:videoId", async (req, res) => {
  try {
    const idReq = await VideoService.getInstance().getVideoById(
      parseInt(req.params.videoId),
    );
    res.status(200).json(idReq);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).send("Error fetching video");
  }
});

export { router as recsysRouter };
