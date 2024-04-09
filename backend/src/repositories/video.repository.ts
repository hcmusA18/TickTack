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
    return `ARRAY[${value.map((v) => `'${v}'`).join(", ")}]`;
  };

  addNewVideo = async (video: VideoModel): Promise<VideoModel | null> => {
    if (!video.music_id) video.music_id = null;
    const query = {
      text: `INSERT INTO videos(user_id, text, create_time, video_url, duration, music_id, hashtags, privacy, view_count) 
      VALUES($1, $2, $3, $4, $5, ${
        video.music_id || null
      }, ${this.stringArrayConverter(video.hashtags)}, $6, $7) RETURNING *`,
      values: [
        video.user_id.toString(),
        video.text,
        video.create_time.toString(),
        video.video_url,
        video.duration.toString(),
        (video.privacy || "public").toString(),
        (video.view_count || 0).toString(),
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
}

export { VideoRepository };
