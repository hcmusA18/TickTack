import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import { Feather } from '@expo/vector-icons'

interface ProfileNavbarProps {
  // title: string;
}

export const ProfileNavbar = (props: ProfileNavbarProps) => {
  // const { title } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="user-plus" size={20}></Feather>
      </TouchableOpacity>

      <Text style={styles.text}>Son Tung M-TP</Text>

      <TouchableOpacity>
        <Feather name="menu" size={20}></Feather>
      </TouchableOpacity>
    </View>
  )
}
