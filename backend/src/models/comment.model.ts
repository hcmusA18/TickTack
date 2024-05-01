class CommentModel {
  userId: number;
  videoId: number;
  commentText: string;
  time: bigint; // Timestamp or unique identifier depending on your schema specifics

  constructor(
    userId: number,
    videoId: number,
    commentText: string,
    time: bigint,
  ) {
    this.userId = userId;
    this.videoId = videoId;
    this.commentText = commentText;
    this.time = time;
  }
}

export { CommentModel };
