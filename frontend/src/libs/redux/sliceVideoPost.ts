import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Sound } from 'libs/types'

type VideoPostType = {
  text: string
  privacy: string
  music: Sound | null
  hashtags: string[]
  duration: number
  videoUrl: string
  file: any
}

const VideoPostSlice = createSlice({
  name: 'videoPost',
  initialState: {
    text: '',
    privacy: 'public',
    music: null,
    hashtags: [],
    duration: 0,
    videoUrl: '',
    file: null
  } as VideoPostType,
  reducers: {
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload
    },
    setPrivacy(state, action: PayloadAction<string>) {
      state.privacy = action.payload
    },
    setMusic(state, action: PayloadAction<Sound | null>) {
      state.music = action.payload
    },
    setHashtags(state, action: PayloadAction<string[]>) {
      state.hashtags = action.payload
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload
    },
    setVideoUrl(state, action: PayloadAction<string>) {
      state.videoUrl = action.payload
    },
    setFile(state, action: PayloadAction<any>) {
      state.file = action.payload
    },
    clearVideoPost(_state) {
      return {
        text: '',
        privacy: 'public',
        music: null,
        hashtags: [],
        duration: 0,
        videoUrl: '',
        file: null
      }
    }
  }
})

export const { setText, setPrivacy, setMusic, setHashtags, setDuration, setVideoUrl, setFile, clearVideoPost } =
  VideoPostSlice.actions
export const VideoPostReducer = VideoPostSlice.reducer
