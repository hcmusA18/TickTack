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

  getVideosByKeyword = async (
    keyword: string,
    getFull: boolean,
  ): Promise<VideoModel[]> => {
    const query = {
      text: getFull
        ? `
        SELECT *, REGEXP_REPLACE(REGEXP_REPLACE(text, '[^a-zA-Z0-9\\s]', '', 'g'), '\\s+', ' ', 'g') AS text_cleaned
        FROM videos
        WHERE REGEXP_REPLACE(REGEXP_REPLACE(text, '[^a-zA-Z0-9\\s]', '', 'g'), '\\s+', ' ', 'g') ILIKE $1;
      `
        : `
        SELECT REGEXP_REPLACE(REGEXP_REPLACE(text, '[^a-zA-Z0-9\\s]', '', 'g'), '\\s+', ' ', 'g') AS text_cleaned
        FROM videos
        WHERE REGEXP_REPLACE(REGEXP_REPLACE(text, '[^a-zA-Z0-9\\s]', '', 'g'), '\\s+', ' ', 'g') ILIKE $1;
      `,
      values: [`%${keyword}%`],
    };
    try {
      const result = await pool.query(query);

      return result.rows.map((video) => {
        return {
          video_id: video.video_id,
          user_id: video.user_id,
          text: video.text_cleaned,
          create_time: video.create_time,
          video_url: video.video_url,
          duration: video.duration,
          music_id: video.music_id,
          hashtags: video.hashtags,
          privacy: video.privacy,
          view_count: video.view_count,
        };
      });
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
}

export { VideoRepository };
