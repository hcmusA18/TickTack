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

  constructor(params: {
    userId: number;
    createTime: number;
    videoUrl: string;
    duration: number;
    hashtags: string[];
    privacy?: "public" | "private" | "friends";
    viewCount?: number;
    musicId?: string | null;
    videoId?: number;
    text?: string;
  }) {
    this.videoId = params.videoId;
    this.userId = params.userId;
    this.text = params.text ?? "";
    this.createTime = params.createTime;
    this.videoUrl = params.videoUrl;
    this.duration = params.duration;
    this.musicId = params.musicId ?? null;
    this.hashtags = params.hashtags;
    this.privacy = params.privacy ?? "public";
    this.viewCount = params.viewCount ?? 0;
  }
}

export { VideoModel };
