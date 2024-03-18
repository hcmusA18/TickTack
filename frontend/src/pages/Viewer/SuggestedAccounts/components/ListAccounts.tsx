import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from 'theme'
import { useNavigation } from '@react-navigation/native'

const AccountItem = ({ avatar, name, followers }) => {
  const navigation = useNavigation()
  const [isFollowed, setIsFollowed] = useState(false)

  const toggleFollow = () => {
    setIsFollowed(!isFollowed) // Toggle the follow state
    // TODO: Send a request to the server to update the follow status
    // update the followr count
  }

  const followButtonStyle = isFollowed ? styles.followedButtonStyle : styles.followButtonStyle
  const followButtonTextStyle = isFollowed ? styles.followedButtonText : styles.followButtonText
  const followButtonContent = isFollowed ? 'Following' : 'Follow'

  return (
    <View style={styles.accountItem}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
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

export const ListAccounts = ({ accounts }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {accounts.map((account, index) => (
          <AccountItem key={index} {...account} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
  },
  scrollViewContent: {
    paddingVertical: 10
  },
  accountItem: {
    backgroundColor: colors.background,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

    // marginBottom: 10
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

    // backgroundColor: 'red'
  },
  textContainer: {
    marginLeft: 15
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100
    // marginBottom: 5
  },
  followButtonStyle: {
    backgroundColor: colors.followButton,
    paddingVertical: 5,
    width: 80,
    alignItems: 'center',
    borderRadius: 2
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
  },
  textFollowers: {
    color: colors.textGray
  }
})
