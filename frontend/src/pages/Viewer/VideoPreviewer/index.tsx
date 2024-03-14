import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Video } from 'expo-av'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { AppStackScreenProps } from 'navigators'
import { colors } from 'theme'

interface VideoPreviewerProps extends AppStackScreenProps<'VideoPreviewer'> {}

export const VideoPreviewer: FC<VideoPreviewerProps> = (props) => {
  const { navigation } = props

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: props.route?.params?.source }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={styles.video}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton}>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color="white"
            onPress={() => navigation.navigate('SavePost', { source: props.route?.params?.source })}
          />
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
