import React, { FC, useEffect, useState } from 'react'
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
import { useAppSelector } from 'libs/redux'
import { AuthUser } from 'libs/types'
import axiosInstance from 'libs/utils/axiosInstance'
import { colors } from 'theme'

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
  const user = useAppSelector((state) => state.auth.user) as AuthUser
  const [likeCnt, setLikeCnt] = useState(0)
  const [followerCnt, setFollowerCnt] = useState(0)
  const [followingCnt, setFollowingCnt] = useState(0)

  const fetchData = async () => {
    const likeResponse = await axiosInstance.getAxios().get(`/user/video/likesCount/${user.user_id}`)
    if (likeResponse.status === 200 && likeResponse.data) {
      setLikeCnt(parseInt(likeResponse.data.data))
    }

    const followerResponse = await axiosInstance.getAxios().get(`/user/followers/count/${user.user_id}`)
    if (followerResponse.status === 200 && followerResponse.data) {
      setFollowerCnt(followerResponse.data.data)
    }

    const followingResponse = await axiosInstance.getAxios().get(`/user/following/count/${user.user_id}`)
    if (followingResponse.status === 200 && followingResponse.data) {
      setFollowingCnt(followingResponse.data.data)
    }
  }

  useEffect(() => {
    fetchData()
  })

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
        <Avatar.Image size={100} source={{ uri: user?.avatar }} style={{ backgroundColor: colors.white }} />
        <Text style={styles.username}>{user?.username}</Text>
        <View style={styles.countContainer}>
          <CountItem label="Following" count={followingCnt.toString()} />
          <CountItem label="Followers" count={followerCnt.toString()} />
          <CountItem label="Likes" count={likeCnt.toString()} />
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
