import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Avatar } from 'react-native-paper'
import styles from './styles'
import { Feather } from '@expo/vector-icons'

interface ProfileHeaderProps {
  // title: string;
}

export const ProfileHeader = (props: ProfileHeaderProps) => {
  // const { title } = props;
  return (
    <View style={styles.container}>
      <Avatar.Icon size={100} icon={'account'} />
      <Text style={styles.username}>@tiger050794</Text>
      <View style={styles.countContainer}>
        <View style={styles.countItemContainer}>
          <Text style={styles.countNumberContainer}>0</Text>
          <Text style={styles.countTextContainer}>Following</Text>
        </View>

        <View style={styles.countItemContainer}>
          <Text style={styles.countNumberContainer}>4,9M</Text>
          <Text style={styles.countTextContainer}>Followers</Text>
        </View>

        <View style={styles.countItemContainer}>
          <Text style={styles.countNumberContainer}>44,7M</Text>
          <Text style={styles.countTextContainer}>Likes</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Share Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
