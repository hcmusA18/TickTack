import { Video, ResizeMode } from 'expo-av'
import { Post } from 'libs/types'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Overlay } from './Overlay'
import { colors } from 'theme'
import { useUser, useVideo } from 'libs/hooks'

const styles = {
  container: {
    flex: 1
  }
}

const PostContent = ({ item, shouldPlay }: { item: Post; shouldPlay: boolean }) => {
  const video = useRef<Video | null>(null)
  const { user, isLoading, isError } = useUser(item.user_id?.toString())
  const [status, setStatus] = useState<any>({})

  useEffect(() => {
    if (!video.current) return
    if (shouldPlay) {
      video.current.playAsync()
    } else {
      video.current.pauseAsync()
      video.current.setPositionAsync(0) // reset video to start
    }
  }, [shouldPlay])

  return (
    <Pressable
      onPress={() => (status.isPlaying ? video.current?.pauseAsync() : video.current?.playAsync())}
      style={styles.container}>
      {isLoading || isError || !user ? null : <Overlay user={user} post={item} />}
      <Video
        ref={video}
        resizeMode={ResizeMode.COVER}
        style={styles.container}
        isLooping
        source={{ uri: item.video_url }}
        useNativeControls={false}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </Pressable>
  )
}

const PostSingle = ({ videoId, shouldPlay }: { videoId: string; shouldPlay: boolean }) => {
  const { video: videoData, isLoading, isError } = useVideo(videoId)

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: colors.black
          }
        ]}>
        <Text style={{ color: colors.white }}>Loading...</Text>
      </View>
    )
  } else if (isError) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: colors.black
          }
        ]}>
        <Text style={{ color: colors.white }}>Error...</Text>
      </View>
    )
  } else {
    return <PostContent item={videoData.video} shouldPlay={shouldPlay} />
  }
}

export const PostMemo = memo(PostSingle)
