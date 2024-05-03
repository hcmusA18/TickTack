import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from 'theme'
import { useAppSelector } from 'libs/redux'
import { AuthUser } from 'libs/types'

interface ProfileNavbarProps {
  // title: string;
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    textAlign: 'center'
  }
})

export const ProfileNavbar = (props: ProfileNavbarProps) => {
  const user = useAppSelector((state) => state.auth.user) as AuthUser
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="user-plus" size={20}></Feather>
      </TouchableOpacity>

      <Text style={styles.text}>{user?.email.split('@')[0]}</Text>

      <TouchableOpacity>
        <Feather name="menu" size={20}></Feather>
      </TouchableOpacity>
    </View>
  )
}
