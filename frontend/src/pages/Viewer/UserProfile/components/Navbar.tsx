import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from 'theme'
import { useNavigation } from '@react-navigation/native'

interface ProfileNavbarProps {
  // title: string;
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  leftBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 55
  },
  rightBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 55
  }
})

export const ProfileNavbar = (props: ProfileNavbarProps) => {
  // const { title } = props;
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.leftBtnContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={20}></Feather>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>Tran Gia Thinh</Text>

      <View style={styles.rightBtnContainer}>
        <TouchableOpacity>
          <Feather name="bell" size={20}></Feather>
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={20}></Feather>
        </TouchableOpacity>
      </View>
    </View>
  )
}
