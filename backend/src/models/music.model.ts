class MusicModel {
  musicId: string;
  musicName: string;
  musicAuthor: string;
  musicUrl: string;

  constructor(
    musicId: string,
    musicName: string,
    musicAuthor: string,
    musicUrl: string,
  ) {
    this.musicId = musicId;
    this.musicName = musicName;
    this.musicAuthor = musicAuthor;
    this.musicUrl = musicUrl;
  }
}

export { MusicModel };
