class VideoModel {
  videoId?: number;
  userId: number;
  text: string;
  createTime: number;
  videoUrl: string;
  duration: number;
  musicId: string | null;
  hashtags: string[];
  privacy: "public" | "private" | "friends";
  viewCount: number;

  constructor(
    userId: number,
    createTime: number,
    videoUrl: string,
    duration: number,
    hashtags: string[],
    privacy: "public" | "private" | "friends" = "public",
    viewCount = 0,
    musicId = null,
    videoId?: number,
    text = "",
  ) {
    this.videoId = videoId;
    this.userId = userId;
    this.text = text;
    this.createTime = createTime;
    this.videoUrl = videoUrl;
    this.duration = duration;
    this.musicId = musicId;
    this.hashtags = hashtags;
    this.privacy = privacy;
    this.viewCount = viewCount;
  }
}

export { VideoModel };
