import { Post } from 'libs/types'
import React, { FC } from 'react'
import { View, Text } from 'react-native'

interface SearchResultVideosProps {
  searchQuery: string
  top: boolean
}
export const SearchResultVideos: FC<SearchResultVideosProps> = ({ searchQuery, top }) => {
  const posts: Post[] = [
    {
      id: '1',
      creator: 'usr1',
      media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'],
      description: 'desc1',
      likesCount: 1,
      commentsCount: 1,
      sharesCount: 1,
      creation: '1',
      hashtags: ['hashtag1', 'hashtag2'],
      musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      id: '2',
      creator: 'usr2',
      media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'],
      description: 'desc2',
      likesCount: 2,
      commentsCount: 2,
      sharesCount: 2,
      creation: '2',
      hashtags: ['hashtag1', 'hashtag2'],
      musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      id: '3',
      creator: 'usr3',
      media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'],
      description: 'desc3',
      likesCount: 3,
      commentsCount: 3,
      sharesCount: 3,
      creation: '3',
      hashtags: ['hashtag1', 'hashtag2'],
      musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
    }
  ]
  return (
    <View>
      {top && <Text>Top Videos</Text>}
      <Text>Search Result Videos</Text>
    </View>
  )
}
