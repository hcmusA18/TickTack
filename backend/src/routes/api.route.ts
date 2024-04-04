import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/userIds", (req, res) => {
  UserController.getInstance().getAllUserIds(req, res);
});

export default router;
