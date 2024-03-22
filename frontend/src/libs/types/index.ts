export interface Post {
  id: string
  creator: string
  media: string[]
  description: string
  likesCount: number
  commentsCount: number
  sharesCount: number
  creation: string
  hashtags: string[]
  musicThumbnail: string
}

export interface Sound {
  id: string
  name: string
  artist: string
  duration: string
  url?: string | null
  thumbnail?: string | null
}

export interface Comment {
  id: string
  creator: string
  comment: string
  time: string
}

export interface User {
  uid: string
  email: string
  displayName: string | null
  photoURL?: string
  followingCount: number
  followersCount: number
  likesCount: number
}

export interface SearchUser extends User {
  id: string
}

export interface Chat {
  id: string
  members: string[]
  lastMessage: string
  lastUpdate?: {
    seconds?: number
    nanoseconds?: number
  }
  messages: Message[]
}

export interface Message {
  id: string
  creator: string
  message: string
}

export enum ModalType {
  NONE = -1,
  COMMENT = 0,
  MUSIC_SELECT = 1
}
