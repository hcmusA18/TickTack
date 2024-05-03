import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from 'theme'
import axiosInstance from 'libs/utils/axiosInstance'
import Toast from 'react-native-simple-toast'

const styles = StyleSheet.create({
  accountItem: {
    backgroundColor: colors.background,
    padding: 10,
    alignItems: 'center'
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30%'
  },
  textContainer: {
    marginLeft: 15
  },
  followButtonStyle: {
    backgroundColor: colors.followButton,
    paddingVertical: 5,
    width: 80,
    alignItems: 'center',
    borderRadius: 2
  },
  followButtonStyleHori: {
    backgroundColor: colors.followButton,
    paddingVertical: 3,
    width: '100%',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10
  },
  followedButtonStyle: {
    backgroundColor: colors.background,
    paddingVertical: 5,
    width: 80,
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.border
  },
  followedButtonStyleHori: {
    backgroundColor: colors.background,
    paddingVertical: 2,
    width: '100%',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border
  },
  followButtonText: {
    fontSize: 14,
    color: colors.white
  },
  followedButtonText: {
    fontSize: 14,
    color: colors.text
  },
  textName: {
    fontWeight: 'bold'
  }
})

interface AccountItemProps {
  avatar: string
  name: string
  followers: number
  isFriendList: boolean
  followStatus: number
  isHorizontal: boolean
  toggleFollow: () => void
}

interface FollowButtonProps {
  followStatus: number
  toggleFollow: () => void
  isHorizontal: boolean
}

const FollowButton = ({ followStatus, toggleFollow, isHorizontal }: FollowButtonProps) => {
  const horizontalFollowedButtonStyle = isHorizontal ? styles.followedButtonStyleHori : styles.followedButtonStyle // followed
  const horizontalFollowButtonTextStyle = isHorizontal ? styles.followButtonStyleHori : styles.followButtonStyle // not follow
  const followButtonStyle = followStatus == 2 ? horizontalFollowedButtonStyle : horizontalFollowButtonTextStyle
  const followButtonTextStyle = followStatus == 2 ? styles.followedButtonText : styles.followButtonText
  const followButtonContent = followStatus == 0 ? 'Follow' : followStatus == 1 ? 'Follow back' : 'Following'
  return (
    <TouchableOpacity style={followButtonStyle} onPress={() => toggleFollow()}>
      <Text style={followButtonTextStyle}>{followButtonContent}</Text>
    </TouchableOpacity>
  )
}

const AccountInfo = ({ name, followers, isFriendList }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textName}>{name}</Text>
      {isFriendList ? <Text>User you may know</Text> : <Text>{followers} followers</Text>}
    </View>
  )
}

const HorizontalAccountItem = ({
  avatar,
  name,
  followers,
  isFriendList,
  followStatus,
  isHorizontal,
  toggleFollow
}: AccountItemProps) => {
  return (
    <View style={[styles.accountItem, { marginRight: 10, width: 150 }]}>
      <Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 100, marginBottom: 5 }} />
      <AccountInfo name={name} followers={followers} isFriendList={isFriendList} />
      <FollowButton followStatus={followStatus} toggleFollow={toggleFollow} isHorizontal={isHorizontal} />
    </View>
  )
}

const VerticalAccountItem = ({
  avatar,
  name,
  followers,
  isFriendList,
  followStatus,
  isHorizontal,
  toggleFollow
}: AccountItemProps) => {
  return (
    <View style={[styles.accountItem, { flexDirection: 'row', justifyContent: 'space-between' }]}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: avatar }} style={{ width: 60, height: 60, borderRadius: 100 }} />
        <AccountInfo name={name} followers={followers} isFriendList={isFriendList} />
      </View>
      <View style={styles.rightContainer}>
        <FollowButton followStatus={followStatus} toggleFollow={toggleFollow} isHorizontal={isHorizontal} />
        <TouchableOpacity>
          <Feather name={'x'} size={20} color={colors.textGray}></Feather>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const AccountItem = ({
  userId,
  accountId,
  avatar,
  name,
  followers,
  isFriendList,
  curFollowStatus,
  isHorizontal
}) => {
  const [followStatus, setFollowStatus] = useState(0)
  useEffect(() => {
    setFollowStatus(curFollowStatus)
  }, [curFollowStatus])

  const toggleFollow = async () => {
    if (followStatus == 2) {
      const response = await axiosInstance.getAxios().post(`/user/unfollow`, {
        userId: userId,
        unfollowId: accountId
      })

      if (response.status !== 200) {
        Toast.show(response.data.message, Toast.LONG)
        return
      }

      setFollowStatus(0)
    } else {
      const response = await axiosInstance.getAxios().post(`/user/follow`, {
        userId: userId,
        followId: accountId
      })

      if (response.status !== 200) {
        Toast.show(response.data.message, Toast.LONG)
        return
      }

      setFollowStatus(2)
    }
  }

  return isHorizontal ? (
    <HorizontalAccountItem
      avatar={avatar}
      name={name}
      followers={followers}
      isFriendList={isFriendList}
      followStatus={followStatus}
      isHorizontal={isHorizontal}
      toggleFollow={toggleFollow}
    />
  ) : (
    <VerticalAccountItem
      avatar={avatar}
      name={name}
      followers={followers}
      isFriendList={isFriendList}
      followStatus={followStatus}
      isHorizontal={isHorizontal}
      toggleFollow={toggleFollow}
    />
  )
}
