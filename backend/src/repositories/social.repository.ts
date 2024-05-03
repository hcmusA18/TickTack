import pool from "./db";

class SocialRepository {
  private static instance: SocialRepository | null = null;
  static getInstance(): SocialRepository {
    if (SocialRepository.instance === null) {
      SocialRepository.instance = new SocialRepository();
    }
    return SocialRepository.instance;
  }
  countFollowers = async (userId: number): Promise<number> => {
    const query = {
      text: "SELECT COUNT(*) FROM socials WHERE following_id = $1",
      values: [userId],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0].count;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  getFollowing = async (userId: number): Promise<any> => {
    const query = {
      text: `
        SELECT u.user_id, u.username, u.avatar
        FROM socials s
        JOIN users u ON s.following_id = u.user_id
        WHERE s.user_id = $1
      `,
      values: [userId],
    };
    try {
      const result = await pool.query(query);
      return result.rows.map((row) => {
        return {
          userId: row.user_id,
          username: row.username,
          avatar: row.avatar,
        };
      });
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  getUnfollowing = async (
    userId: number,
    isFollower: boolean,
  ): Promise<any> => {
    const query = {
      text: isFollower
        ? `
        SELECT u.user_id, u.username, u.avatar
        FROM users u
        JOIN socials s ON u.user_id = s.user_id
        WHERE s.following_id = $1
        AND u.user_id NOT IN (
            SELECT following_id
            FROM socials
            WHERE user_id = $1
        );
      `
        : `
        SELECT u.user_id, u.username, u.avatar
        FROM users u
        WHERE u.user_id != $1
            AND NOT EXISTS (
                SELECT 1
                FROM socials s
                WHERE s.user_id = $1
                    AND s.following_id = u.user_id
            )
            AND NOT EXISTS (
                SELECT 1
                FROM socials s
                WHERE s.following_id = $1
                    AND s.user_id = u.user_id
    );
      `,
      values: [userId],
    };
    try {
      const result = await pool.query(query);
      return result.rows.map((row) => {
        return {
          userId: row.user_id,
          username: row.username,
          avatar: row.avatar,
        };
      });
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  getFollowers = async (
    userId: number,
    isFollowBack: boolean,
  ): Promise<any> => {
    const query = {
      text: isFollowBack
        ? `
        SELECT u.user_id, u.username, u.avatar
        FROM users u
        JOIN socials s ON u.user_id = s.user_id
        WHERE s.following_id = $1
        AND u.user_id IN (
          SELECT following_id
          FROM socials
          WHERE user_id = $1
        )
        
      `
        : `
        SELECT u.user_id, u.username, u.avatar
        FROM users u
        JOIN socials s ON u.user_id = s.user_id
        WHERE s.following_id = $1
      `,
      values: [userId],
    };
    try {
      const result = await pool.query(query);
      return result.rows.map((row) => {
        return {
          userId: row.user_id,
          username: row.username,
          avatar: row.avatar,
        };
      });
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  isFollowing = async (userId: number, checkId: number): Promise<boolean> => {
    const query = {
      text: `
        SELECT COUNT(*) FROM socials
        WHERE user_id = $1
        AND following_id = $2
      `,
      values: [userId, checkId],
    };
    try {
      const result = await pool.query(query);
      return result.rows[0].count > 0;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  follow = async (userId: number, followId: number): Promise<boolean> => {
    const query = {
      text: `
        INSERT INTO socials (user_id, following_id)
        VALUES ($1, $2)
      `,
      values: [userId, followId],
    };
    try {
      await pool.query(query);
      return true;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  unfollow = async (userId: number, unfollowId: number): Promise<boolean> => {
    const query = {
      text: `
        DELETE FROM socials
        WHERE user_id = $1
        AND following_id = $2
      `,
      values: [userId, unfollowId],
    };
    try {
      const result = await pool.query(query);
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
}

export { SocialRepository };
