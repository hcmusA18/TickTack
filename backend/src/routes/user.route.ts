import express from "express";
import {
  UserController,
  SocialController,
  VideoController,
} from "@controllers";

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

router.get("/following/:userId", (req, res) => {
  // get the list of users that I am following
  SocialController.getInstance().getFollowing(req, res);
});

router.get("/following/count/:userId", (req, res) => {
  // get the number of users that I am following
  SocialController.getInstance().getNumFollowing(req, res);
});

router.get("/unfollowing/:userId", (req, res) => {
  // get the list of users that I am not follow (? is follower)
  SocialController.getInstance().getUnfollowing(req, res);
});

router.get("/followers/:userId", (req, res) => {
  // get the list of users that are following me (? follow back)
  SocialController.getInstance().getFollowers(req, res);
});

router.get("/followers/count/:userId", (req, res) => {
  SocialController.getInstance().getNumFollowers(req, res);
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

router.get("/video/likesCount/:userId", (req, res) => {
  VideoController.getInstance().countLikedVideos(req, res);
});

router.get("/video/liked/:userId", (req, res) => {
  VideoController.getInstance().getLikedVideos(req, res);
});

router.get("/video/:userId", (req, res) => {
  VideoController.getInstance().getVideosByUserId(req, res);
});

export { router as userRouter };
