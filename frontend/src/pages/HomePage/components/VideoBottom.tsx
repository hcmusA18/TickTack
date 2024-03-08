import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { colors } from 'theme'

interface VideoBottomProps {
  username: string
  videoPost: string
  hashtags: string[]
}

export const VideoBottom: FC<VideoBottomProps> = ({ username, videoPost, hashtags }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 10
      }}>
      <Text
        style={{
          color: colors.palette.neutral100,
          fontWeight: 'bold',
          fontSize: 18
        }}>
        {username}
      </Text>
      <Text
        style={{
          color: colors.palette.neutral100,
          fontSize: 14,
          fontWeight: 'normal'
        }}>
        {videoPost}
      </Text>
      <Text
        style={{
          color: colors.palette.neutral100,
          fontSize: 16,
          fontWeight: 'bold'
        }}>
        {hashtags.map((hashtag) => `#${hashtag} `)}
      </Text>
    </View>
  )
}
