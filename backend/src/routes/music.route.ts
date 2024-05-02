import express from "express";
import { MusicController } from "@controllers";

const router = express.Router();

router.get("/all", MusicController.getInstance().getAllMusic);

export { router as musicRouter };
