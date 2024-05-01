import pool from "./db";

class SocialRepository {
  private static instance: SocialRepository | null = null;
  private constructor() {
    // do something
  }

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
}

export { SocialRepository };
