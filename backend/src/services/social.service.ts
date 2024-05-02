import { SocialRepository } from "@repositories";

class SocialService {
  private static instance: SocialService | null = null;
  static getInstance(): SocialService {
    if (SocialService.instance === null) {
      SocialService.instance = new SocialService();
    }
    return SocialService.instance;
  }
  countFollowers = async (userId: number): Promise<number> => {
    try {
      const numFollowers =
        await SocialRepository.getInstance().countFollowers(userId);
      return numFollowers;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
}

export { SocialService };
