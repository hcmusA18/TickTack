import React, { FC, useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { colors } from 'theme'
import { Ionicons } from '@expo/vector-icons'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import { useAppDispatch } from 'libs/redux'
import { openModal } from 'libs/redux/sliceModal'
import { Post, User } from 'libs/types'

import { Avatar } from 'react-native-paper'

import axiosInstance from 'libs/utils/axiosInstance'

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 999,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  displayName: {
    color: colors.palette.neutral100,
    fontWeight: 'bold',
    fontSize: 16
  },
  description: {
    marginTop: 10,
    width: 250,
    textAlign: 'justify',
    color: colors.palette.neutral100
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.palette.neutral100,
    marginBottom: 30
  },
  defaultAvatar: {
    marginBottom: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.palette.neutral100
  },
  leftContainer: {
    alignItems: 'center'
  },
  actionButton: {
    paddingBottom: 16
  },
  actionButtonText: {
    color: colors.palette.neutral100,
    textAlign: 'center',
    marginTop: 4
  },
  musicThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
})

interface ActionButtonProps {
  iconName: keyof typeof Ionicons.glyphMap
  text: string | number
  onPress?: () => void
}

interface ActionButtonsProps {
  user: User
  post: Post
}

interface LikeState {
  state: boolean
  count: number
}

const ActionButton = ({ iconName, text, onPress }: ActionButtonProps) => {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Ionicons color={colors.palette.neutral100} size={40} name={iconName} />
      <Text style={styles.actionButtonText}>{text}</Text>
    </TouchableOpacity>
  )
}

export const Overlay: FC<ActionButtonsProps> = ({ user, post }) => {
  const dispatch = useAppDispatch()

  // const navigation =
  const userId = parseInt(user.uid, 10)
  let videoId = parseInt(post.video_id, 10)

  // console.debug('userId', userId, ' + videoId', videoId)
  if (isNaN(videoId)) {
    // console.error(post);

    videoId = 0
  }

  // const currentUser = useAppSelector((state) => state.auth.currentUser)
  const [likeState, setLikeState] = useState<LikeState>({ state: false, count: 0 })
  const [commentsCount, setCommentsCount] = useState<number>(0)

  const getTotalLike = async (videoId: number) => {
    try {
      const response = await axiosInstance.getAxios().get(`/interaction/likes/count/${videoId}`)
      let { like_count: likeCount } = response.data

      // console.debug(response.data)

      if (isNaN(likeCount)) {
        console.error('Like Count is NaN')
        likeCount = 0
      }

      // console.debug(videoId, likeCount);

      setLikeState((prevState) => ({ ...prevState, count: likeCount }))
    } catch (error) {
      console.error('Error fetching likes:', error)
      // Optionally handle error state in UI
    }
  }

  const getInitLikeState = async (videoId, userId) => {
    try {
      const response = await axiosInstance
        .getAxios()
        .get(`/interaction/likes/check`, { video_id: videoId, user_id: userId, time: 1 })
      // console.debug("response:", response.data)
      const isLiked = response.data.status
      setLikeState((prevState) => ({ ...prevState, state: isLiked }))
    } catch (error) {
      console.error('Error fetching likes:', error)
      // Optionally handle error state in UI
    }
  }

  const getCommentCount = async (videoId: number) => {
    try {
      const response = await axiosInstance.getAxios().get(`/comments/comments/count/${videoId}`)

      if (response.status >= 200 && response.status <= 399) {
        const resComments = response.data.count
        console.debug('comments:', resComments) // comments
        setCommentsCount(resComments)
      }
    } catch (error) {
      console.error('Error fetching likes:', error)
      // Optionally handle error state in UI
    }
  }

  useEffect(() => {
    // Replace 123 with your actual initial video ID
    getTotalLike(videoId)
    getInitLikeState(videoId, userId)
    getCommentCount(videoId)
  }, [])

  const handleUpdateLike = async (state: boolean) => {
    try {
      const cnt = state ? 1 : -1

      // Make the like/unlike request
      if (state) {
        await axiosInstance
          .getAxios()
          .post('/interaction/likes', { video_id: videoId, user_id: userId, time: Date.now() })
      } else {
        await axiosInstance.getAxios().delete('/interaction/likes', { data: { video_id: videoId, user_id: userId } })
      }

      // If the request is successful, update the like count in the state
      setLikeState((prevState) => ({ state, count: prevState.count + cnt }))
    } catch (error) {
      console.error('Error updating like:', error)
      // Optionally handle error state in UI
    }
  }

  const animation = useSharedValue(0)
  const rotatingDeg = useDerivedValue(() => {
    return interpolate(animation.value, [0, 360], [0, 360])
  })
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotatingDeg.value}deg` }]
    }
  })
  const easing = Easing.bezier(0.25, -0.5, 0.25, 1.5)
  useEffect(() => {
    animation.value = withRepeat(withTiming(360, { duration: 4000, easing }), -1)
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.displayName}>{user.displayName || user.email}</Text>
        <Text style={styles.description} numberOfLines={3} lineBreakMode="tail">
          {post.text}
        </Text>
      </View>
      <View style={styles.leftContainer}>
        <TouchableOpacity>
          {user.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          ) : (
            <Avatar.Icon size={50} icon="account" style={styles.defaultAvatar} />
          )}
        </TouchableOpacity>
        <ActionButton
          iconName={likeState.state ? 'heart' : 'heart-outline'}
          text={likeState.count}
          onPress={() => handleUpdateLike(!likeState.state)}
        />
        <ActionButton
          iconName="chatbubble"
          text={commentsCount}
          onPress={() => dispatch(openModal({ isOpen: true, data: post, modalType: 0 }))}
        />
        <ActionButton iconName="paper-plane" text={100} />
        <Animated.Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          style={[styles.musicThumbnail, animationStyle]}
        />
      </View>
    </View>
  )
}
