import React, { FC, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ResizeMode, Video } from 'expo-av'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { AppStackScreenProps } from 'navigators'
import { colors } from 'theme'
import { MusicModalNative } from './components/MusicModalNative'
import { MusicModalGorhom } from './components/MusicModalGorhom'

interface VideoPreviewerProps extends AppStackScreenProps<'VideoPreviewer'> {}

export const VideoPreviewer: FC<VideoPreviewerProps> = (props) => {
  const { navigation } = props
  const videoRef = useRef(null)

  const [sound, setSound] = useState('First Item')
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    videoRef.current?.playAsync()
  })

  const handleNext = () => {
    // destroy the video previewer
    videoRef.current?.pauseAsync()
    navigation.navigate('SavePost', { source: props.route?.params?.source })
  }

  return (
    <View style={styles.container}>
      <View style={styles.addSoundContainer}>
        {sound === null ? (
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-evenly' }}
            onPress={() => setModalVisible(true)}>
            <Feather name="music" size={15} color={colors.white} />
            <Text style={{ color: colors.white, fontSize: 15 }}>Add sound</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', width: '70%', justifyContent: 'space-evenly' }}
              onPress={() => setModalVisible(true)}>
              <Feather name="music" size={15} color={colors.white} />
              <Text
                style={{ color: colors.white, fontSize: 15, width: 85, marginLeft: 8 }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {sound}
              </Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity onPress={() => setSound(null)}>
              <Feather name="x" size={20} color={colors.white} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <Video
        source={{ uri: props.route?.params?.source }}
        rate={1.0}
        ref={videoRef}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        style={styles.video}
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

      <MusicModalGorhom visible={modalVisible} setVisible={setModalVisible} sound={sound} setSound={setSound} />
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
