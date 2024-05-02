import express from "express";
import { UserController, SocialController } from "@controllers";

const router = express.Router();

router.get("/", (req, res) => {
  UserController.getInstance().getUserDetail(req, res);
});

router.get("/search/:keyword", (req, res) => {
  UserController.getInstance().getUsersByKeyword(req, res);
});
router.patch("/:userId", (req, res) => {
  UserController.getInstance().updateUserProfile(req, res);
});

router.get("/following/:userId", (req, res) => {
  // get the list of users that I am following
  SocialController.getInstance().getFollowing(req, res);
});

router.get("/unfollowing/:userId", (req, res) => {
  // get the list of users that I am not follow (? is follower)
  SocialController.getInstance().getUnfollowing(req, res);
});

router.get("/followers/:userId", (req, res) => {
  // get the list of users that are following me (? follow back)
  SocialController.getInstance().getFollowers(req, res);
});

router.get("/isfollowing", (req, res) => {
  // check if I am following a user
  SocialController.getInstance().isFollowing(req, res);
});

router.post("/follow", (req, res) => {
  SocialController.getInstance().follow(req, res);
});

router.post("/unfollow", (req, res) => {
  SocialController.getInstance().unfollow(req, res);
});

router.get("/:userId", (req, res) => {
  UserController.getInstance().getUserById(req, res);
});

export { router as userRouter };
