import { MusicService } from "@services";
import { Request, Response } from "express";

class MusicController {
  private static instance: MusicController | null = null;

  private constructor() {
    // do something
  }

  static getInstance(): MusicController {
    if (MusicController.instance === null) {
      MusicController.instance = new MusicController();
    }
    return MusicController.instance;
  }

  getMusicById = async (req: Request, res: Response) => {
    try {
      const musicId = req.params.musicId;
      const music = await MusicService.getInstance().getMusicById(musicId);
      res.status(200).json({ data: music });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  getAllMusic = async (req: Request, res: Response) => {
    try {
      const from = parseInt(req.query.from as string) || 0;
      const limit = parseInt(req.query.limit as string) || undefined;
      const music = await MusicService.getInstance().getAllMusic(from, limit);
      res.status(200).json({ data: music });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  addNewMusic = async (req: Request, res: Response) => {
    try {
      const musicName = req.body.musicName;
      const musicAuthor = req.body.musicAuthor;
      const musicUrl = req.body.musicUrl;
      const music = await MusicService.getInstance().addNewMusic(
        musicName,
        musicAuthor,
        musicUrl,
      );
      res.status(200).json({ data: music });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export { MusicController };
