import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from 'theme'

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
  isHorizontal: boolean
  isFollowed: boolean
  toggleFollow: () => void
}

interface FollowButtonProps {
  isFollowed: boolean
  toggleFollow: () => void
  isHorizontal: boolean
}

const FollowButton = ({ isFollowed, toggleFollow, isHorizontal }: FollowButtonProps) => {
  const horizontalFollowedButtonStyle = isHorizontal ? styles.followedButtonStyleHori : styles.followedButtonStyle // followed
  const horizontalFollowButtonTextStyle = isHorizontal ? styles.followButtonStyleHori : styles.followButtonStyle // not follow
  const followButtonStyle = isFollowed ? horizontalFollowedButtonStyle : horizontalFollowButtonTextStyle
  const followButtonTextStyle = isFollowed ? styles.followedButtonText : styles.followButtonText
  const followButtonContent = isFollowed ? 'Following' : 'Follow'
  return (
    <TouchableOpacity style={followButtonStyle} onPress={() => toggleFollow()}>
      <Text style={followButtonTextStyle}>{followButtonContent}</Text>
    </TouchableOpacity>
  )
}

const AccountInfo = ({ name, followers }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textName}>{name}</Text>
      <Text>{followers} Followers</Text>
    </View>
  )
}

const HorizontalAccountItem = ({
  avatar,
  name,
  followers,
  isHorizontal,
  isFollowed,
  toggleFollow
}: AccountItemProps) => {
  return (
    <View style={[styles.accountItem, { marginRight: 10, width: 150 }]}>
      <Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 100, marginBottom: 5 }} />
      <AccountInfo name={name} followers={followers} />
      <FollowButton isFollowed={isFollowed} toggleFollow={toggleFollow} isHorizontal={isHorizontal} />
    </View>
  )
}

const VerticalAccountItem = ({ avatar, name, followers, isHorizontal, isFollowed, toggleFollow }: AccountItemProps) => {
  return (
    <View style={[styles.accountItem, { flexDirection: 'row', justifyContent: 'space-between' }]}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: avatar }} style={{ width: 60, height: 60, borderRadius: 100 }} />
        <AccountInfo name={name} followers={followers} />
      </View>
      <View style={styles.rightContainer}>
        <FollowButton isFollowed={isFollowed} toggleFollow={toggleFollow} isHorizontal={isHorizontal} />
        <TouchableOpacity>
          <Feather name={'x'} size={20} color={colors.textGray}></Feather>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const AccountItem = ({ avatar, name, followers, isHorizontal }) => {
  const [isFollowed, setIsFollowed] = useState(false)

  const toggleFollow = () => {
    setIsFollowed(!isFollowed) // Toggle the follow state
    // TODO: Send a request to the server to update the follow status
    // update the followr count
  }

  return isHorizontal ? (
    <HorizontalAccountItem
      avatar={avatar}
      name={name}
      followers={followers}
      isHorizontal={isHorizontal}
      isFollowed={isFollowed}
      toggleFollow={toggleFollow}
    />
  ) : (
    <VerticalAccountItem
      avatar={avatar}
      name={name}
      followers={followers}
      isHorizontal={isHorizontal}
      isFollowed={isFollowed}
      toggleFollow={toggleFollow}
    />
  )
}
