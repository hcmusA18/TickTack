import { Request, Response } from "express";
import multer, { Multer, diskStorage } from "multer";
import { VideoService } from "@services";
import { UserModel, VideoModel } from "@models";
import fs from "fs";

const upload: Multer = multer({
  storage: diskStorage({
    destination: (_, __, cb) => {
      cb(null, "uploads/");
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

class VideoController {
  private static instance: VideoController | null = null;

  private constructor() {
    // do something
  }

  static getInstance(): VideoController {
    if (VideoController.instance === null) {
      VideoController.instance = new VideoController();
    }
    return VideoController.instance;
  }

  uploadVideo = (req: Request, res: Response) => {
    upload.single("video")(req, res, async (err: any) => {
      try {
        if (err) {
          console.error(err);
          res
            .status(400)
            .json({ message: `Error uploading file: ${err.message}` });
          return;
        }

        const file = req.file;
        if (!file) {
          console.error("No file uploaded.");
          res.status(400).send("No file uploaded.");
          return;
        }

        const video = req.body as VideoModel;

        // convert video.hashtags to array if it is a string
        if (typeof video.hashtags === "string") {
          video.hashtags = [video.hashtags];
        }

        video.userId = (req.user as UserModel)?.userId ?? 1;

        const response = await VideoService.getInstance().uploadVideo(
          file,
          video,
        );

        // Delete the file after uploading
        fs.unlinkSync(file.path);

        res.status(200).json(response);
      } catch (error) {
        const _error = error as Error;
        res
          .status(500)
          .json({ message: `Error uploading file: ${_error.message}` });
      }
    });
  };

  getVideoById = async (req: Request, res: Response) => {
    try {
      const videoId = parseInt(req.params.video_id);
      const video = await VideoService.getInstance().getVideoById(videoId);
      res.status(200).json({ video });
    } catch (error) {
      const _error = error as Error;
      res
        .status(500)
        .json({ message: `Error when getting video by id: ${_error.message}` });
    }
  };

  getRecommendVideos = async (req: Request, res: Response) => {
    try {
      const userId = req.params.user_id;
      const n = parseInt(req.query.number as string) || 10;
      if (!userId) {
        res.status(400).json({ message: "Missing user_id" });
        return;
      }

      const results = await VideoService.getInstance().getRecommendVideos(
        userId,
        n,
      );
      if (results.length === 0) {
        res.status(404).json({ message: "No video found" });
        return;
      }
      res.status(200).json(results);
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: `Error when getting recommended videos: ${_error.message}`,
      });
    }
  };

  getRandomVideos = async (req: Request, res: Response) => {
    try {
      const n = parseInt(req.params.n);
      const videos = await VideoService.getInstance().getRandomVideos(n);
      res.status(200).json(videos);
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: `Error when getting random videos: ${_error.message}`,
      });
    }
  };

  setPrivacy = async (req: Request, res: Response) => {
    try {
      const { videoId, privacy } = req.body;
      if (!videoId || !privacy) {
        res.status(400).json({ message: "Missing videoId or privacy" });
        return;
      }
      if (
        privacy !== "public" &&
        privacy !== "private" &&
        privacy !== "friends"
      ) {
        res.status(400).json({ message: "Invalid privacy" });
        return;
      }

      const response = await VideoService.getInstance().setPrivacy(
        videoId,
        privacy,
      );
      res.status(200).json(response);
    } catch (error) {
      const _error = error as Error;
      res
        .status(500)
        .json({ message: `Error setting privacy: ${_error.message}` });
    }
  };

  removeVideo = async (req: Request, res: Response) => {
    try {
      const videoId = parseInt(req.params.videoId);
      if (isNaN(videoId)) {
        res.status(400).json({ message: "Invalid videoId" });
        return;
      }

      const response = await VideoService.getInstance().removeVideo(videoId);
      if (response) {
        res.status(200).json({ message: "Video removed" });
      } else {
        res.status(400).json({ message: "Something went wrong!" });
      }
    } catch (error) {
      const _error = error as Error;
      res
        .status(500)
        .json({ message: `Error removing video: ${_error.message}` });
    }
  };

  getVideosByKeyword = async (req: Request, res: Response) => {
    const keyword = req.params.keyword;
    const getFull = req.query.getFull === "true";
    try {
      const results = await VideoService.getInstance().getVideosByKeyword(
        keyword,
        getFull,
      );

      const videos = results.map((video) => {
        return {
          video_id: video.videoId,
          user_id: video.userId,
          text: video.text,
          create_time: video.createTime,
          video_url: video.videoUrl,
          duration: video.duration,
          music_id: video.musicId,
          hashtags: video.hashtags,
          privacy: video.privacy,
          view_count: video.viewCount,
        };
      });

      res.status(200).json({ videos });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: `Error when getting users by keyword: ${_error.message}`,
      });
    }
  };

  countLikesOfVideo = async (req: Request, res: Response) => {
    try {
      const videoId = parseInt(req.params.videoId);
      const count = await VideoService.getInstance().countLikesOfVideo(videoId);
      res.status(200).json({ count });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: `Error when counting likes of video: ${_error.message}`,
      });
    }
  };

  // get count of videos that a user has liked
  countLikedVideos = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const count = await VideoService.getInstance().countLikedVideos(userId);
      res.status(200).json({ data: count });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: `Error when counting liked videos: ${_error.message}`,
      });
    }
  };

  getLikedVideos = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      let videos: VideoModel[] = [];
      if (userId != -1) {
        videos = await VideoService.getInstance().getLikedVideos(userId);
      }
      console.log("Video controller getLikedVideos", videos.length);
      res.status(200).json({ videos });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: `Error when getting liked videos: ${_error.message}`,
      });
    }
  };

  getVideosByUserId = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      let videos: VideoModel[] = [];
      if (userId != -1) {
        videos = await VideoService.getInstance().getVideosByUserId(userId);
      }
      res.status(200).json({ videos });
    } catch (error) {
      const _error = error as Error;
      res.status(500).json({
        message: `Error when getting videos by user id: ${_error.message}`,
      });
    }
  };
}
export { VideoController };
