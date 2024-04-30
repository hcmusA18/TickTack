import express from "express";
import { UserController } from "@controllers";

const router = express.Router();

router.get("/", (req, res) => {
  UserController.getInstance().getUserDetail(req, res);
});

router.get("/search/:keyword", (req, res) => {
  UserController.getInstance().getUsersByKeyword(req, res);
});

export { router as userRouter };
