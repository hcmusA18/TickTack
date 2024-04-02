import { Request, Response } from "express";
import multer, { Multer, diskStorage } from "multer";
import VideoService from "../services/video.service";

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

        const response = await VideoService.getInstance().uploadVideo(file);
        res.status(200).send(response);
      } catch (error) {
        res.status(500).send(error);
      }
    });
  };
}

export default VideoController;
