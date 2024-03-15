import React, { FC, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Avatar } from 'react-native-paper'
import { AppStackScreenProps } from 'navigators'
import { Screen } from 'components'
import { ProfileNavbar } from './components/Navbar'
import { colors } from 'theme'
import { MyVideosContent } from './components/MyVideos'
import { LikedVideosContent } from './components/LikedVideos'
import { SavedPostsContent } from './components/SavedPosts'
import { Feather } from '@expo/vector-icons'

interface UserProfilePageProps extends AppStackScreenProps<'UserProfile'> {}

type TabType = 'MyVideos' | 'LikedVideos'

const followButtonColor = '#ED1254'

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

  const toggleFollow = () => {
    setIsFollowed(!isFollowed) // Toggle the follow state
    // TODO: Send a request to the server to update the follow status
    // update the followr count
  }

  const followButtonStyle = isFollowed ? styles.followedButtonStyle : styles.followButtonStyle
  const followButtonTextStyle = isFollowed ? styles.followedButtonText : styles.followButtonText
  const followButtonContent = isFollowed ? 'Following' : 'Follow'

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

          <TouchableOpacity style={styles.buttonStyle}>
            <Feather name="chevron-down" size={20}></Feather>
          </TouchableOpacity>
        </View>
      </View>
      {/* Profile Header */}

      {/* Bio section */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>I'm Gia Thinh, 21 years old. This is my tiktok account, please follow me!</Text>
      </View>
      {/* Bio section */}

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TabItem tabName="MyVideos" iconName="video" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabItem tabName="LikedVideos" iconName="heart" activeTab={activeTab} setActiveTab={setActiveTab} />
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
    color: colors.palette.neutral500
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
    color: colors.text
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },

  buttonStyle: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: colors.border
  },

  followButtonStyle: {
    backgroundColor: followButtonColor,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 2,
    marginHorizontal: 5
  },
  followedButtonStyle: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 2,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: colors.border
  },
  followButtonText: {
    fontSize: 18,
    color: colors.white
  },
  followedButtonText: {
    fontSize: 18,
    color: colors.text
  },
  bioContainer: {
    paddingHorizontal: 50,
    alignItems: 'center',
    marginBottom: 20
  },
  bioText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center'
  }
})
