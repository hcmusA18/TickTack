import { Video, ResizeMode } from 'expo-av'
import { Post } from 'libs/types'
import React, { useEffect, useRef, useState } from 'react'
import { Pressable } from 'react-native'
import { Overlay } from './Overlay'
import { useUser } from 'libs/hooks'

const styles = {
  container: {
    flex: 1
  }
}

export const PostSingle = ({ item, shouldPlay }: { item: Post; shouldPlay: boolean }) => {
  const video = useRef<Video | null>(null)
  const [status, setStatus] = useState<any>({})
  const user = useUser(item.creator)
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
      style={{
        width: '100%',
        height: '100%'
      }}>
      <Overlay post={item} user={user} />
      <Video
        ref={video}
        resizeMode={ResizeMode.COVER}
        style={styles.container}
        isLooping
        source={{ uri: item.media[0] }}
        useNativeControls={false}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </Pressable>
  )
}
