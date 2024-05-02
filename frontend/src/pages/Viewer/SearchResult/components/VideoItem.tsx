import React, { FC } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Post } from 'libs/types'
import Feather from '@expo/vector-icons/Feather'
import { colors } from 'theme'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    width: '100%'
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 25
  },
  videoContainer: {
    position: 'relative',
    width: 180,
    height: 293
  },
  accountContainer: {
    display: 'flex',
    width: '100%',
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  date: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: colors.palette.neutral100,
    fontWeight: 'bold'
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  name: {
    fontWeight: 'bold'
  },
  follower: {
    color: colors.palette.neutral500
  },
  description: {
    // justify paragraph
    textAlign: 'justify'
  }
})

interface VideoItemProps {
  video: Post
  navigation: any
}

export const VideoItem: FC<VideoItemProps> = ({ video, navigation }) => {
  const { user_id: userId, text, create_time: createTime } = video
  const handlePress = () => navigation.navigate('Main', { screen: 'Home', params: { userId, profile: true } })
  return (
    <TouchableOpacity onPress={handlePress} style={{ flex: 1, width: '50%' }}>
      <View style={styles.container}>
        {/* Video Thumbnail */}
        <View style={styles.videoContainer}>
          <Image source={{ uri: 'https://source.unsplash.com/random' }} style={{ width: 180, height: 293 }} />
          <Text style={styles.date}>{createTime}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {text}
          </Text>
        </View>
        {/* Account info */}
        <View style={styles.accountContainer}>
          <View style={styles.info}>
            <Image source={{ uri: 'https://source.unsplash.com/random' }} style={styles.avatar} />
            <Text style={styles.name}>{userId}</Text>
          </View>
          <Text style={styles.follower}>
            <Feather name="heart" size={12} color="gray" style={{ fontWeight: 'bold' }} />
            100
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
