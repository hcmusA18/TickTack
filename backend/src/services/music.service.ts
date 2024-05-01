import { MusicRepository } from "@repositories";

class MusicService {
  private static instance: MusicService | null = null;

  constructor() {
    // do something
  }

  static getInstance(): MusicService {
    if (MusicService.instance === null) {
      MusicService.instance = new MusicService();
    }
    return MusicService.instance;
  }

  getMusicById = async (musicId: string) => {
    return MusicRepository.getInstance().getMusicById(musicId);
  };

  getAllMusic = async (from: number | undefined, limit: number | undefined) => {
    return MusicRepository.getInstance().getAllMusic(from, limit);
  };

  addNewMusic = async (
    musicName: string,
    musicAuthor: string,
    musicUrl: string,
  ) => {
    return MusicRepository.getInstance().addNewMusic(
      musicName,
      musicAuthor,
      musicUrl,
    );
  };
}

export { MusicService };
