export interface Post {
  video_id: string
  user_id: string // creator
  text: string // description
  create_time: string // creation
  video_url: string // media
  duration: number
  music_id: string
  hashtags: string[]
  privacy: 'public' | 'private' | 'friends'
  view_count: number
  likes_count?: number
  comments_count?: number
  shares_count?: number
  music_thumbnail?: string
}

export interface Sound {
  music_id: string
  music_name: string
  music_author: string
  music_url?: string | null
}

export interface Comment {
  id: string
  creator: string
  comment: string
  time: string
}

export interface User {
  userId?: number
  username: string
  email: string
  password: string
  avatar: string | null
  bio: string | null
  regisDate: number
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
