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

export const AccountItem = ({ avatar, name, followers, isHorizontal }) => {
  const [isFollowed, setIsFollowed] = useState(false)

  const toggleFollow = () => {
    setIsFollowed(!isFollowed) // Toggle the follow state
    // TODO: Send a request to the server to update the follow status
    // update the followr count
  }

  let followButtonStyle
  if (isFollowed) {
    followButtonStyle = isHorizontal ? styles.followedButtonStyleHori : styles.followedButtonStyle
  } else {
    followButtonStyle = isHorizontal ? styles.followButtonStyleHori : styles.followButtonStyle
  }

  const followButtonTextStyle = isFollowed ? styles.followedButtonText : styles.followButtonText
  const followButtonContent = isFollowed ? 'Following' : 'Follow'

  if (isHorizontal) {
    return (
      <View style={[styles.accountItem, { marginRight: 10, width: 150 }]}>
        <Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 100, marginBottom: 5 }} />
        <Text style={styles.textName}>{name}</Text>
        <Text>{followers} Followers</Text>
        <TouchableOpacity style={followButtonStyle} onPress={() => toggleFollow()}>
          <Text style={followButtonTextStyle}>{followButtonContent}</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={[styles.accountItem, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: avatar }} style={{ width: 60, height: 60, borderRadius: 100 }} />
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{name}</Text>
            <Text>{followers} Followers</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity style={followButtonStyle} onPress={() => toggleFollow()}>
            <Text style={followButtonTextStyle}>{followButtonContent}</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name={'x'} size={20} color={colors.textGray}></Feather>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
