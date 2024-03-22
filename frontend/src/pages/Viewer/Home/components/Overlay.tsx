import React, { FC, useEffect, useMemo, useState } from 'react'
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
import { throttle } from 'lodash'
import { Avatar } from 'react-native-paper'

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

  // const currentUser = useAppSelector((state) => state.auth.currentUser)
  const [likeState, setLikeState] = useState({ state: false, count: post.likesCount })
  const [commentsCount] = useState(post.commentsCount)

  // useEffect(() => {
  //   setLikeState({ state: post.isLiked, count: post.likesCount })
  // }, [post])

  const handleUpdateLike = useMemo(
    () =>
      throttle((liked: boolean) => {
        setLikeState((prev) => ({ state: liked, count: prev.count + (liked ? 1 : -1) }))
      }, 1000),
    []
  )

  // const handleUpdateCommentCount = () => {
  //   setCommentsCount((prev) => prev + 1)
  // }

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
        <Text style={styles.description}>{post.description}</Text>
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
        <ActionButton iconName="paper-plane" text={post.sharesCount} />
        <Animated.Image source={{ uri: post.musicThumbnail }} style={[styles.musicThumbnail, animationStyle]} />
      </View>
    </View>
  )
}
