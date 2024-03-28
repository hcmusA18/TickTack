import express from "express";
import userController from "../controllers/user.controller";

const router = express.Router();

router.get("/", (req, res) => {
  userController.getInstance().getUserDetail(req, res);
});

export default router;
