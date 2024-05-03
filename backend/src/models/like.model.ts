class LikeModel {
  user_id: number;
  video_id: number;
  time: number;

  constructor(user_id: number, video_id: number, time: number) {
    this.user_id = user_id;
    this.video_id = video_id;
    this.time = time;
  }
}

export { LikeModel };
