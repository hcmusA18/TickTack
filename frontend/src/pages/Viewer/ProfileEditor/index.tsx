import React, { FC } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { AppStackScreenProps } from 'navigators'
import { Screen } from 'components'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { colors } from 'theme'

interface ProfileEditorProps extends AppStackScreenProps<'ProfileEditor'> {}

const avatarBackgroundColor = 'rgba(0,0,0,0.3)'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: colors.background
    // paddingTop: spacing.md, // Add padding to ensure space from top
  },

  avatarContainer: {
    // flex: 1,
    alignItems: 'center',
    marginTop: 20
  },

  avatarView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.palette.neutral500,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },

  avatarImage: {
    width: 100,
    height: 100,
    position: 'absolute'
  },

  avatarOverlay: {
    backgroundColor: avatarBackgroundColor,
    ...StyleSheet.absoluteFillObject
  },

  avatarText: {
    color: colors.palette.neutral100,
    fontSize: 16,
    marginTop: 5
  },
  aboutContainer: {
    marginTop: 50,
    paddingHorizontal: 20
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text
  },
  fieldsContainer: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flex: 1
    // backgroundColor: 'red',
  },

  fieldItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 15,
    marginBottom: 30
    // backgroundColor: 'red',
  },

  fieldValueContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fieldValue: {
    fontSize: 18
  },
  fieldLabel: {
    fontSize: 18
  }
})

const AvatarSection: FC<{ chooseImage: () => void }> = ({ chooseImage }) => (
  <View style={styles.avatarContainer}>
    <TouchableOpacity style={styles.avatarView} onPress={chooseImage}>
      <Image
        style={styles.avatarImage}
        source={{ uri: 'https://static-images.vnncdn.net/files/publish/2023/5/5/mmw-4-956.jpg' }}
      />

      <View style={styles.avatarOverlay}></View>
      <Feather name="camera" size={26} color={'white'} />
      <Text style={styles.avatarText}>Add</Text>
    </TouchableOpacity>
  </View>
)

const AboutSection: FC = () => (
  <View style={styles.aboutContainer}>
    <Text style={styles.aboutTitle}>About you</Text>
  </View>
)

const FieldsSection: FC<{ navigation: ProfileEditorProps['navigation'] }> = ({ navigation }) => (
  <View style={styles.fieldsContainer}>
    <TouchableOpacity
      style={styles.fieldItemsContainer}
      onPress={() => navigation.navigate('FieldEditor', { fieldName: 'Name', fieldValue: 'Son Tung M-TP' })}>
      <Text style={styles.fieldLabel}>Name</Text>
      <FieldText value="Son Tung M-TP" />
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.fieldItemsContainer}
      onPress={() => navigation.navigate('FieldEditor', { fieldName: 'Username', fieldValue: '@tiger050794' })}>
      <Text style={styles.fieldLabel}>Username</Text>
      <FieldText value="@tiger050794" />
    </TouchableOpacity>
  </View>
)

const FieldText: FC<{ value: string }> = ({ value }) => (
  <View style={styles.fieldValueContainer}>
    <Text style={styles.fieldValue}>{value}</Text>
    <Feather name="chevron-right" size={20} color={'lightgrey'} />
  </View>
)

export const ProfileEditor: FC<ProfileEditorProps> = (props) => {
  const { navigation } = props

  const chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.canceled) {
      if (__DEV__) console.log('Image selected')
    }
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      {/* <NavBar navigation={navigation} /> */}
      <AvatarSection chooseImage={chooseImage} />
      <AboutSection />
      <FieldsSection navigation={navigation} />
    </Screen>
  )
}
