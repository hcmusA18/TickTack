import React, { FC } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from './MyColors'

export interface AuthenOptionProps {
  type: string
  icon: string
  text: string
  onPress: () => void
}

const AuthenOption: FC<AuthenOptionProps> = ({ type: _type, icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={icon} size={20} color="#000" style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.palette.grey300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: '90%', // Set the width to 100px
    alignSelf: 'center', // This will center the button in its parent container
    justifyContent: 'center'
  },
  icon: {
    marginRight: 10,
    // Ensure that the icon stays on the left:
    position: 'absolute',
    left: 20 // This should be equal to your paddingHorizontal value
  },
  text: {
    textAlign: 'center',
    maxWidth: 200,
    fontWeight: 'bold'
  }
})

export default AuthenOption
