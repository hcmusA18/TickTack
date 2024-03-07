import React, { FC, useEffect, useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { AppStackScreenProps } from '../../../../navigators'
import { Screen } from '../../../../components'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { colors } from '../../../../theme'

interface EditProfilePageProps extends AppStackScreenProps<'EditProfile'> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: colors.background
    // paddingTop: spacing.md, // Add padding to ensure space from top
  },

  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10
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
    backgroundColor: 'lightgrey',
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    ...StyleSheet.absoluteFillObject
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
  }
})

export const EditProfilePage: FC<EditProfilePageProps> = (props) => {
  const { navigation } = props

  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.canceled) {
    }
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      {/* Navbar */}
      <View style={styles.navbarContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('PersonalProfileHome')}>
          <Feather name="chevron-left" size={26}></Feather>
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Edit Profile</Text>

        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={26} color={'white'}></Feather>
        </TouchableOpacity>
      </View>
      {/* Navbar */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity style={styles.avatarView} onPress={() => chooseImage()}>
          <Image
            style={styles.avatarImage}
            source={{ uri: 'https://static-images.vnncdn.net/files/publish/2023/5/5/mmw-4-956.jpg' }}></Image>

          <View style={styles.avatarOverlay}></View>
          <Feather name="camera" size={26} color={'white'}></Feather>
          <Text style={{ color: 'white', fontSize: 16, marginTop: 5 }}>Add</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginTop: 50, paddingHorizontal: 20, fontSize: 18, fontWeight: 'bold', color: 'grey' }}>
        About you
      </Text>

      <View style={styles.fieldsContainer}>
        <TouchableOpacity
          style={styles.fieldItemsContainer}
          onPress={() => navigation.navigate('EditProfileField', { fieldName: 'Name', fieldValue: 'Son Tung M-TP' })}>
          <Text style={{ fontSize: 18 }}>Name</Text>
          <View style={styles.fieldValueContainer}>
            <Text style={{ fontSize: 18 }}>Son Tung M-TP</Text>
            <Feather name="chevron-right" size={20} color={'lightgrey'}></Feather>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fieldItemsContainer}
          onPress={() =>
            navigation.navigate('EditProfileField', { fieldName: 'Username', fieldValue: '@tiger050794' })
          }>
          <Text style={{ fontSize: 18 }}>Username</Text>
          <View style={styles.fieldValueContainer}>
            <Text style={{ fontSize: 18 }}>@tiger050794</Text>
            <Feather name="chevron-right" size={20} color={'lightgrey'}></Feather>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}
