import { Feather } from '@expo/vector-icons'
import { useAppSelector } from 'libs/redux'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from 'theme'

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
  const user = useAppSelector((state) => state.auth.user)
  const email = user ? user.email.split('@')[0] : ''

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="user-plus" size={20}></Feather>
      </TouchableOpacity>

      <Text style={styles.text}>{email}</Text>

      <TouchableOpacity>
        <Feather name="menu" size={20}></Feather>
      </TouchableOpacity>
    </View>
  )
}
