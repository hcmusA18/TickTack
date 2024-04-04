import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", (req, res) => {
  UserController.getInstance().getUserDetail(req, res);
});

export default router;
