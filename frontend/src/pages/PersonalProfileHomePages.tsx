import React, { FC, useEffect, useState } from 'react'
import { View, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { AppStackScreenProps } from '../navigators'
import { Screen } from '../components'
import { spacing } from '../theme'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { setAuth } from 'libs/redux/sliceAuth'
import { ProfileNavbar } from '../components/profile/navbar'
import { ProfileHeader } from '../components/profile/header'
import { MyVideosContent } from '../components/profile/videoContent/myVideosContent'
import { LikedVideosContent } from '../components/profile/videoContent/likedVideosContent'
import { SavedPostsContent } from '../components/profile/videoContent/savedPostsContent'
import { Feather } from '@expo/vector-icons'

interface PersonalProfileHomePageProps extends AppStackScreenProps<'PersonalProfileHome'> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
    // paddingTop: spacing.md, // Add padding to ensure space from top
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 40
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },

  tabIcon: {
    color: 'lightgrey'
  },

  activeIcon: {
    color: 'black'
  }
})

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

      <ProfileHeader />

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
    </Screen>
  )
}
