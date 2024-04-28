class MusicModel {
  music_id: string;
  music_name: string;
  music_author: string;
  music_url: string;

  constructor(
    music_id: string,
    music_name: string,
    music_author: string,
    music_url: string,
  ) {
    this.music_id = music_id;
    this.music_name = music_name;
    this.music_author = music_author;
    this.music_url = music_url;
  }
}

export { MusicModel };
