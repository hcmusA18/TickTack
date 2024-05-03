import { LikeRepository } from "@repositories";
import { LikeModel, DisLikeModel } from "@models";

class LikeService {
  private static instance: LikeService | null = null;

  static getInstance(): LikeService {
    if (LikeService.instance === null) {
      LikeService.instance = new LikeService();
    }
    return LikeService.instance;
  }

  checkLike = async (user_id: number, video_id: number): Promise<boolean> => {
    try {
      // Check if the like already exists
      const likeExists = await LikeRepository.getInstance().existsLike(
        user_id,
        video_id,
      );

      // If the like exists, return null (indicating that the like was not added)
      return likeExists;
    } catch (error) {
      console.error("Failed to check and add like:", error);
    }

    return false;
  };

  addLike = async (like: LikeModel): Promise<LikeModel | null> => {
    try {
      return await LikeRepository.getInstance().addLike(like);
    } catch (error) {
      console.error("Failed to add like:", error);
      return null; // Or handle the error as appropriate for your context
    }
  };

  removeLike = async (user_id: number, video_id: number): Promise<boolean> => {
    try {
      return await LikeRepository.getInstance().removeLike(user_id, video_id);
    } catch (error) {
      console.error("Failed to remove like:", error);
      return false;
    }
  };

  addDisLike = async (dislike: DisLikeModel): Promise<DisLikeModel | null> => {
    try {
      return await LikeRepository.getInstance().addDisLike(dislike);
    } catch (error) {
      console.error("Failed to add dislike:", error);
      return null;
    }
  };

  removeDisLike = async (
    user_id: number,
    video_id: number,
  ): Promise<boolean> => {
    try {
      return await LikeRepository.getInstance().removeDisLike(
        user_id,
        video_id,
      );
    } catch (error) {
      console.error("Failed to remove dislike:", error);
      return false;
    }
  };

  getAllLikes = async (video_id: number): Promise<number> => {
    try {
      return await LikeRepository.getInstance().countLikesByVideoId(video_id);
    } catch (error) {
      console.error("Failed to get all likes:", error);
      return 0; // Return 0 or handle the error as appropriate
    }
  };
}

export { LikeService };
