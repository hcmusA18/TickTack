import { Request, Response } from "express";
import multer, { Multer, diskStorage } from "multer";
import VideoService from "../services/video.service";
import VideoModel from "../models/video.model";
import fs from "fs";

const upload: Multer = multer({
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
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
          res.status(400).send(`Error uploading file: ${err.message}`); // Unexpected end of form
          return;
        }

        const file = req.file;
        if (!file) {
          res.status(400).send("No file uploaded.");
          return;
        }

        const video = req.body as VideoModel;

        const response = await VideoService.getInstance().uploadVideo(
          file,
          video,
        );

        // Delete the file after uploading
        fs.unlinkSync(file.path);

        res.status(200).send(response);
      } catch (error) {
        const _error = error as Error;
        res
          .status(500)
          .json({ message: `Error when uploading video: ${_error.message}` });
      }
    });
  };

  getVideoById = async (req: Request, res: Response) => {
    try {
      const video_id = parseInt(req.params.video_id);
      const video = await VideoService.getInstance().getVideoById(video_id);
      res.status(200).json({ video });
    } catch (error) {
      const _error = error as Error;
      res
        .status(500)
        .json({ message: `Error when getting video by id: ${_error.message}` });
    }
  };
}

export default VideoController;
