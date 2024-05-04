import { VideoModel } from "@models";
import pool from "./db";

type VideoQuery = {
  video_id: number;
  user_id: number;
  text: string;
  create_time: number;
  video_url: string;
  duration: number;
  music_id: string | null;
  hashtags: string[];
  privacy: "public" | "private" | "friends";
  view_count: number;
};

class VideoRepository {
  private static instance: VideoRepository | null = null;

  static getInstance(): VideoRepository {
    if (VideoRepository.instance === null) {
      VideoRepository.instance = new VideoRepository();
    }
    return VideoRepository.instance;
  }

  static stringArrayConverter = (value: string[]): string => {
    if (!value || value.length === 0) return "ARRAY[]::TEXT[]";

    const formattedValues = value
      .map((v) => {
        return "'" + v.replace(/'/g, "''") + "'"; // Safely escape single quotes in SQL
      })
      .join(", ");

    return "ARRAY[" + formattedValues + "]::TEXT[]";
  };

  addNewVideo = async (video: VideoModel): Promise<VideoModel | null> => {
    if (!video.musicId) video.musicId = null;
    // check text contains SQL injection
    if (
      video.text.match(/(delete|drop|update|insert|create|alter|select|table)/i)
    ) {
      throw new Error("SQL injection detected");
    }
    const query = {
      text: `INSERT INTO videos(user_id, text, create_time, video_url, duration, music_id, hashtags, privacy, view_count) VALUES($1, $2, $3, $4, $5, ${
        video.musicId
      }, ${VideoRepository.stringArrayConverter(
        video.hashtags,
      )}, $6, $7) RETURNING *`,
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
      return result.rows[0] ?? null;
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
      return result.rows[0] ?? null;
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
          videoId: video.video_id,
          userId: video.user_id,
          text: video.text_cleaned,
          createTime: video.create_time,
          videoUrl: video.video_url,
          duration: video.duration,
          musicId: video.music_id,
          hashtags: video.hashtags,
          privacy: video.privacy,
          viewCount: video.view_count,
        };
      });
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  countLikesOfVideo = async (videoId: number): Promise<number> => {
    const query = {
      text: `SELECT COUNT(*) FROM likes WHERE video_id = $1`,
      values: [videoId],
    };
    try {
      const result = await pool.query(query);

      return parseInt(result.rows[0].count);
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  countLikedVideos = async (userId: number): Promise<number> => {
    const query = {
      text: `SELECT COUNT(*) FROM likes WHERE user_id = $1`,
      values: [userId],
    };
    try {
      const result = await pool.query(query);

      return parseInt(result.rows[0].count);
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  getLikedVideos = async (userId: number): Promise<VideoModel[]> => {
    const query = {
      text: `
        select v.* from
        videos v join likes l on v.video_id = l.video_id
        where l.user_id = $1
      `,
      values: [userId],
    };
    try {
      const result = await pool.query(query);

      return result.rows.map((video) => VideoRepository.toVideoModel(video));
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  getVideosByUserId = async (userId: number): Promise<VideoModel[]> => {
    const query = {
      text: `SELECT * FROM videos WHERE user_id = $1`,
      values: [userId],
    };
    try {
      const result = await pool.query(query);

      return result.rows.map((video) => VideoRepository.toVideoModel(video));
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  static readonly toVideoModel = (video: VideoQuery): VideoModel => {
    return {
      videoId: video.video_id,
      userId: video.user_id,
      text: video.text,
      createTime: video.create_time,
      videoUrl: video.video_url,
      duration: video.duration,
      musicId: video.music_id,
      hashtags: video.hashtags,
      privacy: video.privacy,
      viewCount: video.view_count,
    };
  };
}

export { VideoRepository };
