import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

interface SignupOptionProps {
  icon: string
  text: string
}

const SignupOption: FC<SignupOptionProps> = ({ icon, text }) => {
  return (
    <View style={styles.signupOption}>
      <Button icon={icon}>
        <Text>{text}</Text>
      </Button>
      <Text>{text === 'Sign up' ? 'Use phone or email' : text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  signupOption: {}
})

export default SignupOption
