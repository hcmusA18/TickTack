import { CommentRepository } from "@repositories";
import { CommentModel } from "@models";

class CommentService {
  private static instance: CommentService | null = null;

  static getInstance(): CommentService {
    if (CommentService.instance === null) {
      CommentService.instance = new CommentService();
    }
    return CommentService.instance;
  }

  // Add a new comment
  addComment = async (
    userId: number,
    videoId: number,
    commentText: string,
    time: bigint,
  ): Promise<CommentModel | null> => {
    try {
      if (commentText.trim() === "") {
        throw new Error("Comment text is required");
      }

      const newComment = await CommentRepository.getInstance().createComment(
        userId,
        videoId,
        commentText,
        time,
      );
      return newComment;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error adding comment: ${_error.message}`);
    }
  };

  // Retrieve comments for a specific video
  getCommentsByVideoId = async (videoId: number): Promise<CommentModel[]> => {
    try {
      const comments =
        await CommentRepository.getInstance().getCommentsByVideoId(videoId);

      return comments;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error adding comment: ${_error.message}`);
    }
  };

  // Update a comment
  updateComment = async (
    userId: number,
    videoId: number,
    time: bigint,
    commentText: string,
  ): Promise<CommentModel | null> => {
    try {
      if (commentText.trim() === "") {
        throw new Error("Comment text is required for update");
      }
      const updatedComment =
        await CommentRepository.getInstance().updateComment(
          userId,
          videoId,
          time,
          commentText,
        );
      return updatedComment;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error adding comment: ${_error.message}`);
    }
  };

  // Delete a comment
  deleteComment = async (
    userId: number,
    videoId: number,
    time: number,
  ): Promise<boolean> => {
    try {
      const success = await CommentRepository.getInstance().deleteComment(
        userId,
        videoId,
        time,
      );
      return success;
    } catch (error) {
      const _error = error as Error;
      throw new Error(`Error adding comment: ${_error.message}`);
    }
  };
}

export { CommentService };
