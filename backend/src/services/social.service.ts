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
  countFollowing = async (userId: number): Promise<number> => {
    try {
      const numFollowing =
        await SocialRepository.getInstance().countFollowing(userId);
      return numFollowing;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  getFollowing = async (userId: number): Promise<any> => {
    try {
      const following =
        await SocialRepository.getInstance().getFollowing(userId);
      return following;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  getUnfollowing = async (
    userId: number,
    isFollower: boolean | null = null,
  ): Promise<any> => {
    try {
      isFollower = isFollower ?? false;
      const unfollowing = await SocialRepository.getInstance().getUnfollowing(
        userId,
        isFollower,
      );
      return unfollowing;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  getFollowers = async (
    userId: number,
    isFollowBack: boolean | null = null,
  ): Promise<any> => {
    try {
      isFollowBack = isFollowBack ?? false;
      const followers = await SocialRepository.getInstance().getFollowers(
        userId,
        isFollowBack,
      );
      return followers;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  isFollowing = async (userId: number, checkId: number): Promise<boolean> => {
    try {
      const isFollowing = await SocialRepository.getInstance().isFollowing(
        userId,
        checkId,
      );
      return isFollowing;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  follow = async (userId: number, followId: number): Promise<boolean> => {
    try {
      const isFollowed = await SocialRepository.getInstance().follow(
        userId,
        followId,
      );
      return isFollowed;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
  unfollow = async (userId: number, unfollowId: number): Promise<boolean> => {
    try {
      const isUnfollowed = await SocialRepository.getInstance().unfollow(
        userId,
        unfollowId,
      );
      return isUnfollowed;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`${_error.message}`);
    }
  };
}

export { SocialService };
