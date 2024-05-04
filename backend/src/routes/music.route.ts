import express from "express";
import { MusicController } from "@controllers";

const router = express.Router();

router.get("/all", MusicController.getInstance().getAllMusic);
router.get("/:musicId", MusicController.getInstance().getMusicById);

export { router as musicRouter };
