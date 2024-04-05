import express from "express";
import RecSysController from "../controllers/recsys.controller";

const router = express.Router();

router.get("/:userId", (req, res) => {
  RecSysController.getInstance().getRecommendation(req, res);
});

export default router;
