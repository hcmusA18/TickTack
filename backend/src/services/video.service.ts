import { google } from "googleapis";
import fs from "fs";
import VideoModel from "../models/video.model";
import VideoRepository from "../repositories/video.repository";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

class VideoService {
  private static instance: VideoService | null = null;

  private constructor() {
    // do something
  }

  static getInstance(): VideoService {
    if (VideoService.instance === null) {
      VideoService.instance = new VideoService();
    }
    return VideoService.instance;
  }

  uploadVideo = async (
    file: Express.Multer.File,
    video: VideoModel,
  ): Promise<VideoModel | null> => {
    try {
      const response = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mimeType: file.mimetype,
          parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
        },
        media: {
          mimeType: file.mimetype,
          body: fs.createReadStream(file.path),
        },
      } as any);

      video.video_url =
        "https://drive.google.com/uc?export=view&id=" + response.data.id;
      const newVideo = await this.storeVideo(video);
      console.log(newVideo);

      return newVideo;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  storeVideo = async (video: VideoModel): Promise<VideoModel | null> => {
    try {
      if (!video.create_time) {
        video.create_time = Date.now();
      }
      const newVideo = await VideoRepository.getInstance().addNewVideo(video);
      return newVideo;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
}

export default VideoService;
