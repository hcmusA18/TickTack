import React, { FC, useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Post, User } from 'libs/types'
import Feather from '@expo/vector-icons/Feather'
import { colors } from 'theme'
import axiosInstance from 'libs/utils/axiosInstance'
import Toast from 'react-native-simple-toast'
import { convertTime } from 'libs/utils/convertTime'

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
  const { user_id: userId, text, create_time: createTime, video_url: videoUrl, video_id: videoId } = video

  const videoUrlToGetThumbnail = videoUrl.split('id=')[1]
  const videoThumbnail = `https://drive.google.com/thumbnail?id=${videoUrlToGetThumbnail}`

  const [user, setUser] = useState<User>({} as User)
  const [likesCount, setLikesCount] = useState<number>(0)

  const getUser = async () => {
    try {
      const response = await axiosInstance.getAxios().get(`/user/${userId}`)
      if (response.status !== 200) {
        Toast.show(response.data.message, Toast.LONG)
        return
      }

      const res = {
        uid: response.data.user_id,
        email: response.data.email,
        displayName: response.data.username,
        photoURL: response.data.avatar,
        followingCount: 0,
        followersCount: 0,
        likesCount: 0
      }

      setUser(res)
    } catch (error) {
      console.error('Error fetching user:', error)
      Toast.show('Error fetching user', Toast.LONG)
    }
  }

  useEffect(() => {
    getUser()
  }, [userId])

  const getLikesCount = async () => {
    try {
      const response = await axiosInstance.getAxios().get(`/video/likes/${videoId}`)
      if (response.status !== 200) {
        Toast.show(response.data.message, Toast.LONG)
        return
      }
      setLikesCount(response.data.count)
    } catch (error) {
      console.error('Error fetching likes:', error)
      Toast.show('Error fetching likes', Toast.LONG)
    }
  }

  useEffect(() => {
    getLikesCount()
  }, [videoId])

  const handlePress = () => navigation.navigate('Main', { screen: 'Home', params: { userId, profile: true } })
  return (
    <TouchableOpacity onPress={handlePress} style={{ flex: 1, width: '50%' }}>
      <View style={styles.container}>
        {/* Video Thumbnail */}
        <View style={styles.videoContainer}>
          <Image source={{ uri: videoThumbnail }} style={{ width: 180, height: 293 }} />
          <Text style={styles.date}>{convertTime(createTime)}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {text}
          </Text>
        </View>
        {/* Account info */}
        <View style={styles.accountContainer}>
          <View style={styles.info}>
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
            <Text style={styles.name}>{user.displayName}</Text>
          </View>
          <Text style={styles.follower}>
            <Feather name="heart" size={12} color="gray" style={{ fontWeight: 'bold' }} />
            {likesCount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
