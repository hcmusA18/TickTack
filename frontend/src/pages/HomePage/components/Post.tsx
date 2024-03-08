import { Video, ResizeMode } from 'expo-av'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Pressable, View } from 'react-native'

const styles = {
  container: {
    flex: 1
  }
}

// interface VideoControlRef {
//   play: () => Promise<void>
//   stop: () => Promise<void>
//   unload: () => Promise<void>
// }

// export const PostSingle = forwardRef<VideoControlRef>((props, parentRef) => {
//   const ref = useRef<Video>(null)
//   const play = async () => {
//     if (!ref.current) return
//     const status = await ref.current.getStatusAsync()
//     if (!status?.isPlaying) {
//       try {
//         await ref.current.playAsync()
//       } catch (e) {
//         console.log('Error while playing video: ', e)
//       }
//     }
//   }
//   const stop = async () => {
//     if (!ref.current) return
//     const status = await ref.current.getStatusAsync()
//     if (status?.isPlaying) {
//       try {
//         await ref.current.stopAsync()
//       } catch (e) {
//         console.log('Error while stopping video: ', e)
//       }
//     }
//   }
//   const unload = async () => {
//     if (!ref.current) return
//     try {
//       await ref.current.unloadAsync()
//     } catch (e) {
//       console.log(e)
//     }
//   }

//   useImperativeHandle(parentRef as React.RefObject<unknown>, () => ({
//     play,
//     stop,
//     unload
//   }))

//   useEffect(() => {
//     return () => {
//       unload()
//     }
//   }, [])

//   return (
//     <Video
//       ref={ref}
//       resizeMode={ResizeMode.COVER}
//       shouldPlay={true}
//       isLooping
//       style={styles.container}
//       source={{
//         uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
//       }}
//     />
//   )
// })

// PostSingle.displayName = 'PostSingle'

export const PostSingle = ({ item, shouldPlay }: { item: string; shouldPlay: boolean }) => {
  const video = useRef<Video | null>(null)
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
    <Pressable onPress={() => (status.isPlaying ? video.current?.pauseAsync() : video.current?.playAsync())}>
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}>
        <Video
          ref={video}
          resizeMode={ResizeMode.COVER}
          style={styles.container}
          isLooping
          source={{ uri: item }}
          useNativeControls={false}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
    </Pressable>
  )
}
