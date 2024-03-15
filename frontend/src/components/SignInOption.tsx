import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome' // Make sure you have this library installed and properly linked

export interface SignupOptionProps {
  icon: string
  text: string
  onPress: () => void
}

const SignupOption: FC<SignupOptionProps> = ({ icon, text, onPress }) => {
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
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    width: 300, // Set the width to 100px
    alignSelf: 'center' // This will center the button in its parent container
  },
  icon: {
    marginRight: 10
  },
  text: {
    flex: 1,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10 // Padding to ensure content doesn't touch the edges of the screen
  }
})

export default SignupOption
