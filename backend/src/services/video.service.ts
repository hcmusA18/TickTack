import { google } from "googleapis";
import fs from "fs";
import { VideoModel } from "@models";
import { VideoRepository } from "@repositories";

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

      await drive.permissions.create({
        fileId: response.data.id || "",
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      video.video_url =
        "https://drive.google.com/uc?export=view&id=" + response.data.id;
      const newVideo = await this.storeVideo(video);

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

  getVideoById = async (video_id: number): Promise<VideoModel | null> => {
    try {
      const video = await VideoRepository.getInstance().getVideoById(video_id);
      return video;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  setPrivacy = async (
    videoId: number,
    privacy: string,
  ): Promise<VideoModel | null> => {
    try {
      const updatedVideo = await VideoRepository.getInstance().setPrivacy(
        videoId,
        privacy,
      );
      return updatedVideo;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  removeVideo = async (videoId: number): Promise<boolean> => {
    try {
      const deleted = await VideoRepository.getInstance().removeVideo(videoId);
      return deleted;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
}

export { VideoService };
