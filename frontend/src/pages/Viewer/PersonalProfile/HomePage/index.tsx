import React, { FC, useEffect, useState } from 'react'
import { View, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Avatar } from 'react-native-paper'
import { AppStackScreenProps } from '../../../../navigators'
import { Screen } from '../../../../components'
import { ProfileNavbar } from './components/Navbar'
import { colors } from '../../../../theme'
import { MyVideosContent } from './components/MyVideos'
import { LikedVideosContent } from './components/LikedVideos'
import { SavedPostsContent } from './components/SavedPosts'
import { Feather } from '@expo/vector-icons'

interface PersonalProfileHomePageProps extends AppStackScreenProps<'PersonalProfileHome'> {}

export const PersonalProfileHomePage: FC<PersonalProfileHomePageProps> = (props) => {
  const { navigation } = props
  const [activeTab, setActiveTab] = useState('MyVideos')

  const renderContent = () => {
    switch (activeTab) {
      case 'MyVideos':
        return <MyVideosContent />
      case 'LikedVideos':
        return <LikedVideosContent />
      case 'SavedPosts':
        return <SavedPostsContent />
      default:
        return null
    }
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <ProfileNavbar />

      {/* Profile Header */}
      <View style={styles.headerContainer}>
        <Avatar.Icon size={100} icon={'account'} />
        <Text style={styles.username}>@tiger050794</Text>
        <View style={styles.countContainer}>
          <View style={styles.countItemContainer}>
            <Text style={styles.countNumberContainer}>0</Text>
            <Text style={styles.countTextContainer}>Following</Text>
          </View>

          <View style={styles.countItemContainer}>
            <Text style={styles.countNumberContainer}>4,9M</Text>
            <Text style={styles.countTextContainer}>Followers</Text>
          </View>

          <View style={styles.countItemContainer}>
            <Text style={styles.countNumberContainer}>44,7M</Text>
            <Text style={styles.countTextContainer}>Likes</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Share Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Profile Header */}

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'MyVideos' && styles.activeTab]}
          onPress={() => setActiveTab('MyVideos')}>
          <Feather
            name="menu"
            size={20}
            style={activeTab === 'MyVideos' ? styles.activeIcon : styles.tabIcon}></Feather>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'LikedVideos' && styles.activeTab]}
          onPress={() => setActiveTab('LikedVideos')}>
          <Feather
            name="heart"
            size={20}
            style={activeTab === 'LikedVideos' ? styles.activeIcon : styles.tabIcon}></Feather>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'SavedPosts' && styles.activeTab]}
          onPress={() => setActiveTab('SavedPosts')}>
          <Feather
            name="pocket"
            size={20}
            style={activeTab === 'SavedPosts' ? styles.activeIcon : styles.tabIcon}></Feather>
        </TouchableOpacity>
      </View>

      {renderContent()}
      {/* Tab bar */}
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background
    // paddingTop: spacing.md, // Add padding to ensure space from top
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center'
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // paddingVertical: 10,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 40
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.tint
  },

  tabIcon: {
    color: 'lightgrey'
  },

  activeIcon: {
    color: colors.text
  },

  headerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 40
  },

  username: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },

  countContainer: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    // width: "80%",
    marginTop: 15
  },

  countItemContainer: {
    flex: 1,
    alignItems: 'center'
  },

  countNumberContainer: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  countTextContainer: {
    fontSize: 16,
    color: colors.textDim
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },

  buttonStyle: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: colors.border
  },

  buttonText: {
    fontSize: 18
  }
})
