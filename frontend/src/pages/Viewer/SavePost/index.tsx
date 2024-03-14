import { View, Text, TouchableOpacity, TextInput, Image, Modal, StyleSheet } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons'
import { AppStackScreenProps } from 'navigators'
import React, { FC, useState, useRef } from 'react'
import { RadioButton } from 'react-native-paper'
import { colors } from 'theme'

interface SavePostPageProps extends AppStackScreenProps<'SavePost'> {}

export const SavePostPage: FC<SavePostPageProps> = (props) => {
  const { navigation } = props

  const [textInput, setTextInput] = useState('')
  const textInputRef = useRef<TextInput>(null)
  const [privacy, setPrivacy] = useState('private')
  // const [privacyButton, setPrivacyButton] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const addHashTag = () => {
    setTextInput((prev) => prev + '#')
    textInputRef.current?.focus()
  }

  const handlePrivacyChange = (value: string) => {
    setPrivacy(value)
    // setModalVisible(false)
  }

  const videoSrc = props.route?.params?.source

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.rightFormContainer}>
          <TextInput
            style={styles.inputText}
            ref={textInputRef}
            maxLength={150}
            multiline
            placeholder="Describe your video"
            value={textInput}
            onChangeText={setTextInput}
          />

          <TouchableOpacity style={styles.hashtagButton} onPress={addHashTag}>
            <Feather name="hash" size={13} color="black" />
            <Text style={{ color: colors.palette.neutral900, fontSize: 12, fontWeight: 'bold' }}>Hashtags</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('VideoPreviewer', { source: videoSrc })}>
          <Image style={styles.mediaPreview} source={{ uri: videoSrc }} />
        </TouchableOpacity>
      </View>

      <View style={styles.settingContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.privacyContainer}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              {privacy === 'public' ? (
                <>
                  <Feather name="globe" size={24} />
                  <Text style={{ marginLeft: 10 }}>Everyone can see your post</Text>
                </>
              ) : privacy === 'friends' ? (
                <>
                  <Feather name="users" size={24} />
                  <Text style={{ marginLeft: 10 }}>Friends can see your post</Text>
                </>
              ) : (
                <>
                  <Feather name="lock" size={24} />
                  <Text style={{ marginLeft: 10 }}>Only you can see your post</Text>
                </>
              )}
            </View>
            <AntDesign name="right" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.spacer} />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={styles.cancelButton}>
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton}>
          <Feather name="corner-left-up" size={24} color="white" />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}>
        <View style={styles.modalViewContainer}>
          <View style={styles.modalContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 20,
                paddingBottom: 10,
                paddingTop: 0
              }}>
              <View></View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Privacy settings</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <Text style={{ fontSize: 17, marginBottom: 10, fontWeight: 'bold' }}>Who can see your post?</Text>
              <RadioButton.Group onValueChange={handlePrivacyChange} value={privacy}>
                <RadioButton.Item label="Everyone" value="public" color={postBackgroundColor} />
                <RadioButton.Item label="Friends" value="friends" color={postBackgroundColor} />
                <RadioButton.Item label="Only you" value="private" color={postBackgroundColor} />
              </RadioButton.Group>
              {/* <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.saveButton}>
                <Text style={{ color: colors.palette.neutral100 }}>Save</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const postBackgroundColor = '#ff4040'
const translucentBackgroundColor = 'rgba(0, 0, 0, 0.5)'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.palette.neutral100
  },
  // uploadingContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
  spacer: {
    flex: 1
  },
  formContainer: {
    margin: 20,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.palette.neutral300,
    paddingVertical: 10
  },
  rightFormContainer: {
    flexDirection: 'column',
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20
  },
  inputText: {
    paddingVertical: 10,
    marginRight: 20,
    flex: 1
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: colors.palette.neutral900,
    width: 80
  },
  hashtagButton: {
    backgroundColor: colors.background,
    alignItems: 'center',
    borderColor: colors.palette.neutral300,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start'
  },
  cancelButton: {
    alignItems: 'center',
    flex: 1,
    borderColor: colors.palette.neutral300,
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 10
  },
  postButton: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: postBackgroundColor,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 10
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
  },
  settingContainer: {
    flex: 1
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  modalViewContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: translucentBackgroundColor
  },
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: colors.palette.neutral200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '35%',
    padding: 10
  },
  modalContent: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 10,
    padding: 20
  }
  // saveButton: {
  //   alignItems: 'center',
  //   marginTop: 10,
  //   backgroundColor: postBackgroundColor,
  //   paddingVertical: 10,
  //   borderRadius: 10
  // }
})
