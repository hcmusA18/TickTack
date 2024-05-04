import { VideoService } from "@services";
import { VideoRepository } from "@repositories";

jest.mock("@repositories/video.repository", () => ({
  VideoRepository: {
    getInstance: jest.fn(() => ({
      getVideoById: jest.fn(),
      addNewVideo: jest.fn(),
      getVideosByUserId: jest.fn(),
      getLikedVideos: jest.fn(),
      countLikedVideos: jest.fn(),
      getVideosByKeyword: jest.fn(),
    })),
  },
}));

describe("VideoService", () => {
  let videoService: VideoService;
  let mockedVideoRepository: VideoRepository;

  beforeEach(() => {
    mockedVideoRepository = {
      getVideoById: jest.fn(),
      addNewVideo: jest.fn(),
      getVideosByUserId: jest.fn(),
      getLikedVideos: jest.fn(),
      countLikedVideos: jest.fn(),
      getVideosByKeyword: jest.fn(),
    } as unknown as VideoRepository;
    jest
      .spyOn(VideoRepository, "getInstance")
      .mockReturnValue(mockedVideoRepository);

    videoService = VideoService.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("storeVideo", () => {
    it("should store a new video", async () => {
      const createTime = Date.now();
      const video = {
        userId: 1,
        text: "test video",
        videoUrl: "test video url",
        duration: 60,
        musicId: "testMusicId",
        hashtags: ["test", "video"],
        privacy: "public" as "public" | "private" | "friends",
        createTime,
        viewCount: 0,
      };
      (mockedVideoRepository.addNewVideo as jest.Mock).mockResolvedValueOnce({
        videoId: 1,
        ...video,
      });

      await videoService.storeVideo(video);

      expect(mockedVideoRepository.addNewVideo).toHaveBeenCalledWith(video);
    });
  });

  describe("getVideoById", () => {
    it("should return video by videoId", async () => {
      const videoId = 1;
      const video = {
        videoId,
        userId: 1,
        text: "test video",
        createTime: 123456789,
        videoUrl: "test video url",
        duration: 60,
        musicId: "testMusicId",
        hashtags: ["test", "video"],
        privacy: "public" as "public" | "private" | "friends",
        viewCount: 0,
      };
      (mockedVideoRepository.getVideoById as jest.Mock).mockResolvedValueOnce(
        video,
      );

      const result = await videoService.getVideoById(videoId);

      expect(result).toEqual(video);
      expect(mockedVideoRepository.getVideoById).toHaveBeenCalledWith(videoId);
    });
  });

  describe("getVideosByUserId", () => {
    it("should return videos by userId", async () => {
      const userId = 1;
      const videos = [
        {
          videoId: 1,
          userId,
          text: "test video",
          createTime: 123456789,
          videoUrl: "test video url",
          duration: 60,
          musicId: "testMusicId",
          hashtags: ["test", "video"],
          privacy: "public" as "public" | "private" | "friends",
          viewCount: 0,
        },
      ];
      (
        mockedVideoRepository.getVideosByUserId as jest.Mock
      ).mockResolvedValueOnce(videos);

      const result = await videoService.getVideosByUserId(userId);

      expect(result).toEqual(videos);
      expect(mockedVideoRepository.getVideosByUserId).toHaveBeenCalledWith(
        userId,
      );
    });
  });

  describe("getLikedVideos", () => {
    it("should return liked videos by userId", async () => {
      const userId = 1;
      const videos = [
        {
          videoId: 1,
          userId: 2,
          text: "test video",
          createTime: 123456789,
          videoUrl: "test video url",
          duration: 60,
          musicId: "testMusicId",
          hashtags: ["test", "video"],
          privacy: "public" as "public" | "private" | "friends",
          viewCount: 0,
        },
      ];
      (mockedVideoRepository.getLikedVideos as jest.Mock).mockResolvedValueOnce(
        videos,
      );

      const result = await videoService.getLikedVideos(userId);

      expect(result).toEqual(videos);
      expect(mockedVideoRepository.getLikedVideos).toHaveBeenCalledWith(userId);
    });
  });

  describe("getVideosByKeyword", () => {
    it("should return videos by keyword", async () => {
      const keyword = "test";
      const videos = [
        {
          videoId: 1,
          userId: 2,
          text: "test video",
          createTime: 123456789,
          videoUrl: "test video url",
          duration: 60,
          musicId: "testMusicId",
          hashtags: ["test", "video"],
          privacy: "public" as "public" | "private" | "friends",
          viewCount: 0,
        },
      ];
      (
        mockedVideoRepository.getVideosByKeyword as jest.Mock
      ).mockResolvedValueOnce(videos);

      const result = await videoService.getVideosByKeyword(keyword);

      expect(result).toEqual(videos);
      expect(mockedVideoRepository.getVideosByKeyword).toHaveBeenCalledWith(
        keyword,
        false,
      );
    });
  });
});
