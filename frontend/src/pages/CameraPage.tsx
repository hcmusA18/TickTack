import React, { FC, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { AppStackScreenProps } from '../../navigators'
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useIsFocused } from '@react-navigation/core'
import { Feather } from '@expo/vector-icons'

interface CameraPageProps extends AppStackScreenProps<'Camera'> {}

export const CameraPage: FC<CameraPageProps> = (props) => {
  const { navigation } = props
  const [cameraPermission, setCameraPermission] = useState(false)
  const [audioPermission, setAudioPermission] = useState(false)
  const [galleryPermission, setGalleryPermission] = useState(false)
  const [mediaPermission, setMediaPermission] = useState(false)
  const [galleryItems, setgalleryItems] = useState([])
  const [cameraRef, setCameraRef] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off)
  const [cameraReady, setCameraReady] = useState(false)

  const isFoucused = useIsFocused()

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()
        console.log('Camera permission:', cameraStatus)
        setCameraPermission(cameraStatus === 'granted')

        const { status: audioStatus } = await Audio.requestPermissionsAsync()
        console.log('Audio permission:', audioStatus)
        setAudioPermission(audioStatus === 'granted')

        const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        console.log('Gallery permission:', galleryStatus)
        setGalleryPermission(galleryStatus === 'granted')

        const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync()
        console.log('Media permission:', mediaStatus)
        setMediaPermission(mediaStatus === 'granted')

        if (cameraStatus === 'granted' && audioStatus === 'granted' && galleryStatus === 'granted') {
          console.log('All permissions granted')
        } else {
          console.log('Some permissions are not granted')
          return (
            <View style={styles.container}>
              <Text>Some permissions are not granted</Text>
            </View>
          )
        }

        if (mediaPermission) {
          const assets = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] })
          setgalleryItems(assets.assets)
          console.log('Gallery items:', galleryItems)
        }
      } catch (error) {
        console.error('Error while requesting permissions:', error)
      }
    }
    getPermissions()
  }, [])

  const recordVideo = async () => {
    try {
      if (!cameraReady) return
      const video = await cameraRef.recordAsync({
        quality: Camera.Constants.VideoQuality['480p'],
        maxDuration: 20
      })
      if (video) {
        const data = await video
        const source = data.uri
      }
    } catch (error) {
      console.error('Error while recording video:', error)
    }
  }

  const stopVideo = async () => {
    try {
      if (!cameraReady) return
      cameraRef.stopRecording()
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
        console.log('Image picked:', result)
      }
    } catch (error) {
      console.error('Error while picking image:', error)
    }
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

      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraType(
              cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
            )
          }>
          <Feather name="refresh-ccw" size={24} color={'white'} />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraFlash(
              cameraFlash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            )
          }>
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
            {galleryItems[0] === undefined ? (
              <></>
            ) : (
              <Image style={styles.galleryButtonImage} source={{ uri: galleryItems[0].uri }} />
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
  recordBtn: '#FF4040'
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
  }
})
