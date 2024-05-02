import React, { FC, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Avatar } from 'react-native-paper'
import { MainTabScreenProps } from 'navigators'
import { Screen } from 'components'
import { ProfileNavbar } from './components/Navbar'
import { styles } from './styles'
import { MyVideosContent } from './components/MyVideos'
import { LikedVideosContent } from './components/LikedVideos'
import { SavedPostsContent } from './components/SavedPosts'
import { Feather } from '@expo/vector-icons'

type TabType = 'MyVideos' | 'LikedVideos' | 'SavedPosts'

interface PersonalProfileProps extends MainTabScreenProps<'Profile'> {}

const CountItem = ({ label, count }: { label: string; count: string }) => (
  <View style={styles.countItemContainer}>
    <Text style={styles.countNumberContainer}>{count}</Text>
    <Text style={styles.countTextContainer}>{label}</Text>
  </View>
)

const TabItem = ({
  tabName,
  iconName,
  activeTab,
  setActiveTab
}: {
  tabName: TabType
  iconName: keyof typeof Feather.glyphMap
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}) => {
  const isActive = activeTab === tabName
  return (
    <TouchableOpacity style={[styles.tabItem, isActive && styles.activeTab]} onPress={() => setActiveTab(tabName)}>
      <Feather name={iconName} size={20} style={[styles.tabIcon, isActive && styles.activeIcon]}></Feather>
    </TouchableOpacity>
  )
}

export const PersonalProfile: FC<PersonalProfileProps> = (props) => {
  const { navigation } = props
  const [activeTab, setActiveTab] = useState<TabType>('MyVideos')

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
          <CountItem label="Following" count="0" />
          <CountItem label="Followers" count="4.9M" />
          <CountItem label="Likes" count="44.7M" />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('ProfileEditor')}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('UserProfile')}>
            <Text style={styles.buttonText}>Share Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Profile Header */}

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TabItem tabName="MyVideos" iconName="video" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabItem tabName="LikedVideos" iconName="heart" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabItem tabName="SavedPosts" iconName="bookmark" activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>

      {renderContent()}
      {/* Tab bar */}
    </Screen>
  )
}
