import { Request, Response } from "express";
import multer, { Multer, diskStorage } from "multer";
import { VideoService } from "@services";
import { VideoModel } from "@models";
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
          res
            .status(400)
            .json({ message: `Error uploading file: ${err.message}` });
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

        res.status(200).json(response);
      } catch (error) {
        const _error = error as Error;
        res
          .status(500)
          .json({ message: `Error uploading file: ${_error.message}` });
      }
    });
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
}

export { VideoController };
