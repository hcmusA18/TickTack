import React, { FC, useState } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { Text, Avatar } from 'react-native-paper'
import { AppStackScreenProps } from 'navigators'
import { Screen } from 'components'
import { ProfileNavbar } from './components/Navbar'
import { MyVideosContent } from './components/MyVideos'
import { LikedVideosContent } from './components/LikedVideos'
import { SuggestedAccount } from './components/SuggestedAccount'
import { Feather } from '@expo/vector-icons'
import { styles } from './styles'

interface UserProfilePageProps extends AppStackScreenProps<'UserProfile'> {}

type TabType = 'MyVideos' | 'LikedVideos'

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

export const UserProfilePage: FC<UserProfilePageProps> = (props) => {
  const { navigation } = props
  const [activeTab, setActiveTab] = useState<TabType>('MyVideos')
  const [isFollowed, setIsFollowed] = useState(false)
  const [showSuggestedAccount, setShowSuggestedAccount] = useState(false)

  const followButtonStyle = isFollowed ? styles.followedButtonStyle : styles.followButtonStyle
  const followButtonTextStyle = isFollowed ? styles.followedButtonText : styles.followButtonText
  const followButtonContent = isFollowed ? 'Following' : 'Follow'
  const chevronIcon = showSuggestedAccount ? 'chevron-up' : 'chevron-down'

  const toggleFollow = () => {
    setIsFollowed(!isFollowed) // Toggle the follow state

    if (!isFollowed) setShowSuggestedAccount(true) // Show suggested account if the user is followed

    // TODO: Send a request to the server to update the follow status
    // update the followr count
  }

  const toggleSuggestedAccount = () => {
    setShowSuggestedAccount(!showSuggestedAccount) // Toggle the visibility of SuggestedAccount
    // console.log(showSuggestedAccount);
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'MyVideos':
        return <MyVideosContent />
      case 'LikedVideos':
        return <LikedVideosContent />
      default:
        return null
    }
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <ProfileNavbar />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Header */}
        <View style={styles.headerContainer}>
          <Avatar.Icon size={100} icon={'account'} />
          <Text style={styles.username}>@giathinnnn</Text>
          <View style={styles.countContainer}>
            <CountItem label="Following" count="0" />
            <CountItem label="Followers" count="4.9M" />
            <CountItem label="Likes" count="44.7M" />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={followButtonStyle} onPress={toggleFollow}>
              <Text style={followButtonTextStyle}>{followButtonContent}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonStyle} onPress={toggleSuggestedAccount}>
              <Feather name={chevronIcon} size={20}></Feather>
            </TouchableOpacity>
          </View>
        </View>
        {/* Profile Header */}

        {/* Bio section */}
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>I'm Gia Thinh, 21 years old. This is my tiktok account, please follow me!</Text>
        </View>
        {/* Bio section */}

        {/* Suggested account section */}
        {showSuggestedAccount && <SuggestedAccount navigation={navigation} />}
        {/* Suggested account section */}

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <TabItem tabName="MyVideos" iconName="video" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabItem tabName="LikedVideos" iconName="heart" activeTab={activeTab} setActiveTab={setActiveTab} />
        </View>

        {renderContent()}
        {/* Tab bar */}
      </ScrollView>
    </Screen>
  )
}
