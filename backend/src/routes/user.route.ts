import express from "express";
import userController from "../controllers/user.controller";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.get("/", (req, res) => {
  userController.getUserDetail(req, res);
});

router.post("/signup", (req, res) => {
  authController.getInstance().signUpByEmail(req, res);
});

export default router;
