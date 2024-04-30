import { VideoModel } from "@models";
import pool from "./db";

class VideoRepository {
  private static instance: VideoRepository | null = null;
  constructor() {
    // do something
  }
  static getInstance(): VideoRepository {
    if (VideoRepository.instance === null) {
      VideoRepository.instance = new VideoRepository();
    }
    return VideoRepository.instance;
  }

  private stringArrayConverter = (value: string[]): string => {
    if (!value || value.length === 0) return `ARRAY[]::TEXT[]`;
    return `ARRAY[${value.map((v) => `'${v}'`).join(", ")}]`;
  };

  addNewVideo = async (video: VideoModel): Promise<VideoModel | null> => {
    if (!video.musicId) video.musicId = null;
    const query = {
      text: `INSERT INTO videos(user_id, text, create_time, video_url, duration, music_id, hashtags, privacy, view_count) 
      VALUES($1, $2, $3, $4, $5, ${
        video.musicId
      }, ${this.stringArrayConverter(video.hashtags)}, $6, $7) RETURNING *`,
      values: [
        video.userId.toString(),
        video.text,
        video.createTime.toString(),
        video.videoUrl,
        video.duration.toString(),
        (video.privacy || "public").toString(),
        (video.viewCount || 0).toString(),
      ],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  getVideoById = async (video_id: number): Promise<VideoModel | null> => {
    const query = {
      text: "SELECT * FROM videos WHERE video_id = $1",
      values: [video_id],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  setPrivacy = async (
    videoId: number,
    privacy: string,
  ): Promise<VideoModel | null> => {
    const query = {
      text: `UPDATE videos SET privacy = $1 WHERE video_id = $2 RETURNING *`,
      values: [privacy, videoId.toString()],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  removeVideo = async (videoId: number): Promise<boolean> => {
    const query = {
      text: `DELETE FROM videos WHERE video_id = $1`,
      values: [videoId.toString()],
    };
    try {
      await pool.query(query);
      return true;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
}

export { VideoRepository };
