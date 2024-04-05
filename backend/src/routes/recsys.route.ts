import express from "express";
import RecSysController from "../controllers/recsys.controller";
import axios from "axios";

const router = express.Router();

router.get("/user/:userId", (req, res) => {
  RecSysController.getInstance().getRecommendation(req, res);
});

router.get("/video", async (req, res) => {
  try {
    const videoUrl =
      "https://drive.google.com/uc?export=view&id=1TzSmaVRpsD6517n6PIGiPRm0W0z1kZJp";
    const response = await axios.get(videoUrl, { responseType: "stream" });
    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).send("Error fetching video");
  }
});

export default router;
