import React, { FC, useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Avatar } from 'react-native-paper'
import { MainTabScreenProps } from 'navigators'
import { Screen } from 'components'
import { ProfileNavbar } from './components/Navbar'
import { styles } from './styles'
import { MyVideosContent } from './components/MyVideos'
import { SavedPostsContent } from './components/SavedPosts'
import { Feather } from '@expo/vector-icons'
import { useAppSelector } from 'libs/redux'
import { AuthUser } from 'libs/types'
import axiosInstance from 'libs/utils/axiosInstance'
import { colors } from 'theme'

export enum TabType {
  MyVideos = 'MyVideos',
  LikedVideos = 'LikedVideos',
  SavedPosts = 'SavedPosts'
}

interface PersonalProfileProps extends MainTabScreenProps<'Profile'> {}

const CountItem = ({ label, count }: { label: string; count: string }) => (
  <View style={styles.countItemContainer}>
    <Text style={styles.countNumberContainer}>{count}</Text>
    <Text style={styles.countTextContainer}>{label}</Text>
  </View>
)

const fetchCountData = async (url: string, updater: (data: number) => void) => {
  try {
    const response = await axiosInstance.getAxios().get(url)
    if (response.status === 200 && response.data) {
      updater(parseInt(response.data.data))
    }
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
}

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

const TabContent = ({ navigation, type, user }) => {
  if (type === TabType.SavedPosts) {
    return <SavedPostsContent />
  }
  return <MyVideosContent navigation={navigation} type={type} user={user} />
}

export const PersonalProfile: FC<PersonalProfileProps> = (props) => {
  const { navigation } = props
  const [activeTab, setActiveTab] = useState<TabType>(TabType.MyVideos)
  const user = useAppSelector((state) => state.auth.user) as AuthUser
  const [likeCnt, setLikeCnt] = useState(0)
  const [followerCnt, setFollowerCnt] = useState(0)
  const [followingCnt, setFollowingCnt] = useState(0)
  const tabs = [
    { tabName: TabType.MyVideos, iconName: 'video' },
    { tabName: TabType.LikedVideos, iconName: 'heart' },
    { tabName: TabType.SavedPosts, iconName: 'bookmark' }
  ]
  const counts = [
    { label: 'Following', count: followingCnt.toString() },
    { label: 'Followers', count: followerCnt.toString() },
    { label: 'Likes', count: likeCnt.toString() }
  ]

  const userId = user ? user.userId : -1

  const fetchData = async () => {
    await Promise.all([
      fetchCountData(`/user/video/likesCount/${userId}`, setLikeCnt),
      fetchCountData(`/user/followers/count/${userId}`, setFollowerCnt),
      fetchCountData(`/user/following/count/${userId}`, setFollowingCnt)
    ])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <ProfileNavbar />

      {/* Profile Header */}
      <View style={styles.headerContainer}>
        <Avatar.Image size={100} source={{ uri: user?.avatar }} style={{ backgroundColor: colors.white }} />
        <Text style={styles.username}>{user?.username}</Text>
        <View style={styles.countContainer}>
          {counts.map((count) => (
            <CountItem key={count.label} label={count.label} count={count.count} />
          ))}
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
        {tabs.map((tab) => (
          <TabItem
            key={tab.tabName}
            tabName={tab.tabName}
            iconName={tab.iconName as keyof typeof Feather.glyphMap}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </View>

      <View style={{ display: 'flex', width: '100%', height: '100%' }}>
        {tabs.map((tab) => (
          <TabContent key={tab.tabName} navigation={navigation} type={tab.tabName} user={user} />
        ))}
      </View>
      {/* Tab bar */}
    </Screen>
  )
}
