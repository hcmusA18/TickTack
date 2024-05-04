import pool from "./db";
import { MusicModel } from "@models";

class MusicRepository {
  private static instance: MusicRepository | null = null;
  static getInstance(): MusicRepository {
    if (MusicRepository.instance === null) {
      MusicRepository.instance = new MusicRepository();
    }
    return MusicRepository.instance;
  }

  getMusicById = async (music_id: string): Promise<MusicModel | null> => {
    const query = {
      text: "SELECT * FROM musics WHERE music_id = $1",
      values: [music_id],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0] || null;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  getAllMusic = async (
    from: number | undefined,
    limit: number | undefined,
  ): Promise<MusicModel[] | null> => {
    let query = null;

    if (from !== undefined && limit !== undefined) {
      query = {
        text: "SELECT * FROM musics ORDER BY music_id OFFSET $1 LIMIT $2",
        values: [from, limit],
      };
    } else {
      query = {
        text: "SELECT * FROM musics",
      };
    }

    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };

  addNewMusic = async (
    music_name: string,
    music_author: string,
    music_url: string,
  ): Promise<MusicModel | null> => {
    const query = {
      text: "INSERT INTO musics(music_name, music_author, music_url) VALUES($1, $2, $3) RETURNING *",
      values: [music_name, music_author, music_url],
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

export { MusicRepository };
