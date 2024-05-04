import { Video, ResizeMode, Audio } from 'expo-av'
import { Post } from 'libs/types'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Overlay } from './Overlay'
import { colors } from 'theme'
import { useMusic, useUser, useVideo } from 'libs/hooks'
import { loadBackgroundMusic } from 'libs/utils/loadBackgroundMusic'

const styles = {
  container: {
    flex: 1
  }
}

const PostContent = ({ item, shouldPlay }: { item: Post; shouldPlay: boolean }) => {
  const video = useRef<Video | null>(null)
  const { user, isLoading, isError } = useUser(item.user_id?.toString())
  const { music, isLoading: musicLoading, isError: musicError } = useMusic(item.music_id?.toString())
  const [status, setStatus] = useState<any>({})
  const [muteVideo, setMuteVideo] = useState<boolean>(false)

  const soundObject = useRef<Audio.Sound | null>(null)

  useEffect(() => {
    const currentSoundObject = soundObject.current
    if (!video.current) return
    if (shouldPlay) {
      video.current.playAsync()
      if (music && !musicLoading && !musicError && !music.music_url?.includes('lis.tn')) {
        setMuteVideo(true)
        loadBackgroundMusic({ music, soundObject: soundObject.current })
      }
    } else {
      video.current.pauseAsync()
      soundObject.current?.unloadAsync()
      video.current.setPositionAsync(0) // reset video to start
    }
    return () => {
      currentSoundObject?.unloadAsync()
      setMuteVideo(false)
    }
  }, [music, musicError, musicLoading, shouldPlay])

  return (
    <Pressable
      onPress={() => (status.isPlaying ? video.current?.pauseAsync() : video.current?.playAsync())}
      style={styles.container}>
      {(isLoading || isError) && !user ? null : <Overlay user={user} post={item} />}
      <Video
        ref={video}
        resizeMode={ResizeMode.COVER}
        style={styles.container}
        isLooping
        isMuted={muteVideo}
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
