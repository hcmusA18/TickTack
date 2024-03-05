import React, { FC, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from 'theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 14,
    padding: 10,
    gap: 25
  },
  musicThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  avatarThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 5,
    borderColor: colors.palette.primary500,
    borderWidth: 4
  }
})

interface ActionButtonsProps {
  loveCount: number
  commentCount: number
  saveCount: number
  shareCount: number
  musicThumbnail: string
}

const ActionButton = ({ text, icon }) => {
  return (
    <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }}>
      <MaterialCommunityIcons
        name={icon}
        size={32}
        color={colors.palette.neutral100}
        style={{
          textShadowColor: colors.palette.neutral900,
          textShadowOffset: { width: 1, height: 1 }
        }}
      />
      <Text
        style={{
          color: colors.palette.accent100,
          fontSize: 14,
          textShadowColor: colors.palette.neutral900,
          textShadowOffset: { width: 1, height: 1 },
          fontWeight: 'bold'
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export const ActionButtons: FC<ActionButtonsProps> = ({
  loveCount,
  commentCount,
  saveCount,
  shareCount,
  musicThumbnail
}) => {
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
      <TouchableOpacity style={{ position: 'relative' }}>
        <Image source={{ uri: musicThumbnail }} style={styles.avatarThumbnail} />
        <View
          style={{
            position: 'absolute',
            bottom: -8,
            right: 14,
            backgroundColor: colors.palette.primary500,
            borderRadius: 25,
            padding: 5
          }}>
          <MaterialCommunityIcons name="plus" size={12} color={colors.palette.neutral100} />
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: 'column', gap: 25, alignItems: 'center' }}>
        <ActionButton text={loveCount} icon="heart" />
        <ActionButton text={commentCount} icon="comment-minus" />
        <ActionButton text={saveCount} icon="bookmark" />
      </View>
      <View style={{ flexDirection: 'column', gap: 30 }}>
        <ActionButton text={shareCount} icon="share" />
        {/* Rotating music thumbnail */}
        <Animated.Image source={{ uri: musicThumbnail }} style={[styles.musicThumbnail, animationStyle]} />
      </View>
    </View>
  )
}
