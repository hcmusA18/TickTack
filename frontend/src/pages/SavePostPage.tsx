import { View, Text, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { AppStackScreenProps } from '../navigators'
import React, { FC, useState, useRef } from 'react'

interface SavePostPageProps extends AppStackScreenProps<'SavePost'> {}

export const SavePostPage: FC<SavePostPageProps> = (props) => {
  console.log('SavePostPageProps:', props)
  const { navigation } = props

  const [textInput, setTextInput] = useState('')
  const textInputRef = useRef<TextInput>(null)

  const addHashTag = () => {
    setTextInput((prev) => prev + '#')
    textInputRef.current?.focus()
  }

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
            <Text style={{ color: 'black', fontSize: 12, fontWeight: 'bold' }}>Hashtags</Text>
          </TouchableOpacity>
        </View>
        <Image style={styles.mediaPreview} source={{ uri: props.route?.params?.source }} />
      </View>
      <View style={styles.spacer} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Feather name="x" size={24} color="black" />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton}>
          <Feather name="corner-left-up" size={24} color="white" />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white'
  },
  uploadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spacer: {
    flex: 1
  },
  formContainer: {
    margin: 20,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
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
    backgroundColor: 'black',
    width: 80
  },
  hashtagButton: {
    backgroundColor: '#DFDEDE',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    height: 'fit-content'
  },
  cancelButton: {
    alignItems: 'center',
    flex: 1,
    borderColor: 'lightgray',
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
    backgroundColor: '#ff4040',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 4,
    marginRight: 10
  },
  cancelButtonText: {
    marginLeft: 5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
  postButtonText: {
    marginLeft: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
}
