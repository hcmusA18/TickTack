import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { colors } from 'theme'
import { Feather } from '@expo/vector-icons'

const backgroundItemColor = '#e9e9e9'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
    // backgroundColor: colors.white,
    // paddingVertical: 10,
  },
  scrollContainer: {
    paddingVertical: 10
  },
  accountItem: {
    backgroundColor: backgroundItemColor,
    // backgroundColor: colors.white,
    // borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150, // Width of each item
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 5
  },
  followButton: {
    backgroundColor: colors.followButton,
    paddingVertical: 3,
    width: '100%',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10
  },
  followButtonText: {
    fontSize: 14,
    color: colors.white
  },
  textName: {
    fontWeight: 'bold'
  }
})

const AccountItem = ({ avatar, name, followers }) => {
  return (
    <View style={styles.accountItem}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.textName}>{name}</Text>
      <Text>{followers} Followers</Text>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </View>
  )
}

export const HorizontalScrollable = ({ accounts }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {accounts.map((account, index) => (
          <View key={index}>
            <AccountItem {...account} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
