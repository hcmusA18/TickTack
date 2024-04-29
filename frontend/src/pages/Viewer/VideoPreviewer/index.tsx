import React, { FC, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ResizeMode, Video, Audio } from 'expo-av'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { AppStackScreenProps } from 'navigators'
import { colors } from 'theme'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { ModalType } from 'libs/types'
import { openModal } from 'libs/redux/sliceModal'
import axiosInstance from 'libs/utils/axiosInstance'
import { setMusic } from 'libs/redux/sliceVideoPost'

interface VideoPreviewerProps extends AppStackScreenProps<'VideoPreviewer'> {}

export const VideoPreviewer: FC<VideoPreviewerProps> = (props) => {
  const { navigation } = props
  const dispatch = useAppDispatch()
  const music = useAppSelector((state) => state.videoPost.music)
  const videoUrl = useAppSelector((state) => state.videoPost.videoUrl)
  const videoRef = useRef(null)
  let soundObject = null

  let musicData = []

  useEffect(() => {
    videoRef.current?.playAsync()

    loadBackgroundMusic()

    getAllMusics()

    return () => {
      if (soundObject !== null) {
        soundObject.unloadAsync()
      }
    }
  })

  const handleNext = () => {
    // destroy the video previewer
    videoRef.current?.pauseAsync()
    navigation.navigate('SavePost')
  }

  const loadBackgroundMusic = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: music?.music_url
      })
      // await sound.loadAsync()
      soundObject = sound
      await soundObject.setIsLoopingAsync(true)
      await soundObject.playAsync()
    } catch (error) {
      console.log('Error loading sound', error)
    }
  }

  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish && soundObject !== null) {
      soundObject.replayAsync()
    }
  }

  const getAllMusics = async () => {
    try {
      await axiosInstance
        .getAxios()
        .get('/music/all')
        .then((response) => {
          musicData = response.data.data
        })
    } catch (error) {
      const _error = error as Error
      console.error(`${_error.message}`)
      throw new Error(`${_error.message}`)
    }
  }

  const handleOpenSoundModal = async () => {
    dispatch(openModal({ isOpen: true, data: musicData, modalType: ModalType.MUSIC_SELECT }))
  }
  const handleClearSoundSelect = () => {
    dispatch(setMusic(null))
  }

  return (
    <View style={styles.container}>
      <View style={styles.addSoundContainer}>
        {music === null ? (
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-evenly' }}
            onPress={handleOpenSoundModal}>
            <Feather name="music" size={15} color={colors.white} />
            <Text style={{ color: colors.white, fontSize: 15 }}>Add sound</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', width: '70%', justifyContent: 'space-evenly' }}
              onPress={handleOpenSoundModal}>
              <Feather name="music" size={15} color={colors.white} />
              <Text
                style={{ color: colors.white, fontSize: 15, width: 85, marginLeft: 8 }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {music.music_name || 'Add sound'}
              </Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={handleClearSoundSelect}>
              <Feather name="x" size={20} color={colors.white} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <Video
        source={{ uri: videoUrl }}
        rate={1.0}
        ref={videoRef}
        volume={1.0}
        isMuted={music !== null}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        style={styles.video}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Main', { screen: 'Camera' })} style={styles.cancelButton}>
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton}>
          <MaterialIcons name="navigate-next" size={24} color="white" onPress={handleNext} />
          <Text style={styles.postButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const COLORS = {
  postBtn: '#FF4040'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.palette.neutral900
  },
  video: {
    width: '100%',
    height: '85%'
  },
  addSoundContainer: {
    backgroundColor: colors.palette.overlay50,
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 40,
    zIndex: 1000,
    width: '40%',
    height: 40,
    borderRadius: 8
  },
  separator: {
    width: 1,
    height: 15,
    backgroundColor: colors.palette.neutral300
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10
  },
  cancelButton: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.neutral300,
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10
  },
  postButton: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.postBtn,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 10,
    marginLeft: 10
  },
  cancelButtonText: {
    marginLeft: 5,
    color: colors.palette.neutral900,
    fontWeight: 'bold',
    fontSize: 16
  },
  postButtonText: {
    marginLeft: 5,
    color: colors.palette.neutral100,
    fontWeight: 'bold',
    fontSize: 16
  }
})
