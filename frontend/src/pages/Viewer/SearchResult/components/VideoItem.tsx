import Feather from '@expo/vector-icons/Feather'
import { User } from 'libs/types'
import axiosInstance from 'libs/utils/axiosInstance'
import { convertTime } from 'libs/utils/convertTime'
import React, { FC, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-simple-toast'
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
  video: any
  creatorPost?: any[]
  navigation: any
}

export const VideoItem: FC<VideoItemProps> = ({ video, creatorPost, navigation }) => {
  const [user, setUser] = useState<User>({} as User)
  const [likesCount, setLikesCount] = useState<number>(0)

  if (!video || !video.videoUrl) return <></>

  const videoUrlToGetThumbnail = video.videoUrl.split('id=')[1]
  const videoThumbnail = `https://drive.google.com/thumbnail?id=${videoUrlToGetThumbnail}`

  const getUser = async () => {
    try {
      const response = await axiosInstance.getAxios().get(`/user/${video.userId}`)
      if (response.status !== 200) {
        Toast.show(response.data.message, Toast.LONG)
        return
      }

      const res = {
        userId: response.data.user_id,
        email: response.data.email,
        username: response.data.username,
        avatar: response.data.avatar,
        regisDate: response.data.regis_date,
        bio: response.data.bio
      }

      setUser(res)
    } catch (error) {
      console.error('Error fetching user:', error)
      Toast.show('Error fetching user', Toast.LONG)
    }
  }

  useEffect(() => {
    getUser()
  }, [video.userId])

  const getLikesCount = async () => {
    try {
      const response = await axiosInstance.getAxios().get(`/video/likes/${video.videoId}`)
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
  }, [video.videoId])

  const handlePress = () =>
    navigation.navigate('CreatorFeed', {
      creatorPost,
      videoId: video.videoId
    })
  return (
    <TouchableOpacity onPress={handlePress} style={{ flex: 1, width: '50%' }}>
      <View style={styles.container}>
        {/* Video Thumbnail */}
        <View style={styles.videoContainer}>
          <Image source={{ uri: videoThumbnail }} style={{ width: 180, height: 293 }} />
          <Text style={styles.date}>{convertTime(video.createTime)}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {video.text}
          </Text>
        </View>
        {/* Account info */}
        <View style={styles.accountContainer}>
          <View style={styles.info}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{user.username}</Text>
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
