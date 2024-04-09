class VideoModel {
  video_id?: number;
  user_id: number;
  text: string;
  create_time: number;
  video_url: string;
  duration: number;
  music_id: string | null;
  hashtags: string[];
  is_private: boolean;
  view_count: number;

  constructor(
    user_id: number,
    create_time: number,
    video_url: string,
    duration: number,
    hashtags: string[],
    is_private = false,
    view_count = 0,
    music_id = null,
    video_id?: number,
    text = "",
  ) {
    this.video_id = video_id;
    this.user_id = user_id;
    this.text = text;
    this.create_time = create_time;
    this.video_url = video_url;
    this.duration = duration;
    this.music_id = music_id;
    this.hashtags = hashtags;
    this.is_private = is_private;
    this.view_count = view_count;
  }
}

export { VideoModel };
