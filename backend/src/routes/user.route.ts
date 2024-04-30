import express from "express";
import { UserController } from "@controllers";

const router = express.Router();

router.get("/", (req, res) => {
  UserController.getInstance().getUserDetail(req, res);
});

router.patch("/:userId", (req, res) => {
  UserController.getInstance().updateUserProfile(req, res);
});

export { router as userRouter };
