import express from "express";
import { UserController } from "@controllers";

const router = express.Router();

router.get("/", (req, res) => {
  UserController.getInstance().getUserDetail(req, res);
});

router.get("/comments/:userId", (req, res) => {
  UserController.getInstance().getUserCommentInfo(req, res);
});

router.get("/:userId", (req, res) => {
  UserController.getInstance().getUserById(req, res);
});

router.get("/search/:keyword", (req, res) => {
  UserController.getInstance().getUsersByKeyword(req, res);
});

router.patch("/:userId", (req, res) => {
  UserController.getInstance().updateUserProfile(req, res);
});

export { router as userRouter };
