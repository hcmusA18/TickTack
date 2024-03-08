import React, { FC, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { MainTabScreenProps } from 'navigators'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import { Audio } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useIsFocused } from '@react-navigation/core'
import { Feather } from '@expo/vector-icons'

interface CameraPageProps extends MainTabScreenProps<'Camera'> {}

export const CameraPage: FC<CameraPageProps> = (props) => {
  const { navigation } = props
  const [cameraPermission, setCameraPermission] = useState(false)
  const [audioPermission, setAudioPermission] = useState(false)
  const [galleryPermission, setGalleryPermission] = useState(false)
  const [mediaPermission, setMediaPermission] = useState(false)
  const [recording, setRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [galleryItems, setGalleryItems] = useState([])
  const [galleryItemUri, setGalleryItemUri] = useState<string | null>(null)
  const [cameraRef, setCameraRef] = useState(null)
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [cameraFlash, setCameraFlash] = useState(FlashMode.off)
  const [cameraReady, setCameraReady] = useState(false)

  const isFoucused = useIsFocused()

  // Get permissions
  useEffect(() => {
    const getPermissions = async () => {
      try {
        // Get all permissions
        const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync()
        setMediaPermission(mediaStatus === 'granted')

        if (mediaPermission) {
          const assets = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] })
          setGalleryItems(assets.assets)
        }

        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()
        setCameraPermission(cameraStatus === 'granted')

        const { status: audioStatus } = await Audio.requestPermissionsAsync()
        setAudioPermission(audioStatus === 'granted')

        const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        setGalleryPermission(galleryStatus === 'granted')

        if (!(cameraStatus === 'granted' && audioStatus === 'granted' && galleryStatus === 'granted')) {
          return (
            <View style={styles.container}>
              <Text>Some permissions are not granted</Text>
            </View>
          )
        }
      } catch (error) {
        console.error('Error while requesting permissions:', error)
      }
    }
    getPermissions()
  }, [])

  // Update recording time
  useEffect(() => {
    let timerId: NodeJS.Timeout

    if (recording) {
      timerId = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(timerId)
    }

    return () => clearInterval(timerId)
  }, [recording])

  // Set gallery item uri
  useEffect(() => {
    if (galleryItems[0] !== undefined) {
      setGalleryItemUri(galleryItems[0].uri)
    }
  }, [galleryItems])

  const recordVideo = async () => {
    try {
      if (!cameraReady) return
      setRecording(true)
      const video = await cameraRef.recordAsync({
        quality: Camera.Constants.VideoQuality['480p'],
        maxDuration: 20
      })
      if (video) {
        const data = await video
        const source = data.uri ?? ('' as string)
        navigation.navigate('SavePost', { source })
      }
    } catch (error) {
      console.error('Error while recording video:', error)
    }
  }

  const stopVideo = async () => {
    try {
      if (!cameraReady) return
      cameraRef.stopRecording()
      setRecording(false)
      setRecordingTime(0)
    } catch (error) {
      console.error('Error while stopping video:', error)
    }
  }

  const pickVideo = async () => {
    try {
      if (!galleryPermission) return
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1
      })
      if (!result.canceled) {
        const source = result.assets[0].uri ?? ''
        navigation.navigate('SavePost', { source })
      }
    } catch (error) {
      console.error('Error while picking image:', error)
    }
  }

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <View style={styles.container}>
      {isFoucused && cameraPermission && audioPermission && galleryPermission ? (
        <Camera
          style={styles.camera}
          ref={(ref) => setCameraRef(ref)}
          ratio={'16:9'}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setCameraReady(true)}
        />
      ) : (
        <Text>Permissions not granted</Text>
      )}

      {recording && (
        <View style={styles.recordingTimeContainer}>
          <Text style={styles.recordingTimeText}>{formatTime(recordingTime)}</Text>
        </View>
      )}

      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back)}>
          <Feather name="refresh-ccw" size={24} color={'white'} />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() => setCameraFlash(cameraFlash === FlashMode.off ? FlashMode.torch : FlashMode.off)}>
          <Feather name="zap" size={24} color={'white'} />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <View style={{ flex: 1 }}></View>

        <View style={styles.recordBtnContainer}>
          <TouchableOpacity
            style={styles.recordBtn}
            disabled={!cameraReady}
            onLongPress={() => recordVideo()}
            onPressOut={() => stopVideo()}
          />
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => pickVideo()} style={styles.galleryBtn}>
            {galleryItemUri === null ? (
              <></>
            ) : (
              <Image style={styles.galleryButtonImage} source={{ uri: galleryItemUri }} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const COLORS = {
  white: '#fff',
  black: '#000',
  blue: '#007bff',
  red: '#dc3545',
  green: '#28a745',
  recordBtnBorder: '#FF404087',
  recordBtn: '#FF4040',
  transparent: 'transparent'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center'
  },
  camera: {
    flex: 1,
    backgroundColor: COLORS.black,
    aspectRatio: 9 / 16
  },
  recordBtnContainer: {
    flex: 1,
    marginHorizontal: 30
  },
  recordBtn: {
    borderWidth: 8,
    borderColor: COLORS.recordBtnBorder,
    backgroundColor: COLORS.recordBtn,
    borderRadius: 100,
    height: 80,
    width: 80,
    alignSelf: 'center'
  },
  galleryBtn: {
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 10,
    overflow: 'hidden',
    height: 50,
    width: 50
  },
  galleryButtonImage: {
    width: 50,
    height: 50
  },
  sideBarContainer: {
    bottom: 150,
    right: 0,
    marginHorizontal: 20,
    position: 'absolute'
  },
  iconText: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: 5
  },
  sideBarButton: {
    alignItems: 'center',
    marginBottom: 25
  },
  recordingTimeContainer: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.transparent,
    padding: 10,
    borderRadius: 20
  },
  recordingTimeText: {
    color: COLORS.white,
    fontSize: 20
  }
})
