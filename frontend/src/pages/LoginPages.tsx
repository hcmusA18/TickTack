import React, { FC, useEffect, useState } from 'react'
import { ViewStyle, StyleSheet } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'
import { AppStackScreenProps } from '../navigators'
import { Screen } from '../components'
import { spacing } from '../theme'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { setAuth } from 'libs/redux/sliceAuth'

interface LoginPageProps extends AppStackScreenProps<'Login'> {}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg
  } as ViewStyle
})

export const LoginPage: FC<LoginPageProps> = (props) => {
  const { navigation } = props
  const dispatch = useAppDispatch()

  // const authPasswordInput = useRef<Input>(null)
  const [password, setPassword] = useState<string>('')
  const { authToken, authEmail } = useAppSelector((state) => state.auth)
  const [inputEmail, setInputEmail] = useState<string>(authEmail || '')
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [attemptCount, setAttemptCount] = useState<number>(0)

  // const error = isSubmitted && attemptCount >= 3

  useEffect(() => {
    if (authToken) {
      navigation.navigate('Main')
    }
    setInputEmail(authEmail || 'email@mail.com')
    setPassword('123456789')
  }, [])

  const togglePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const login = () => {
    setIsSubmitted(true)
    setAttemptCount(attemptCount + 1)
    if (!inputEmail || !password || isSubmitted) return
    if (inputEmail && password) {
      dispatch(setAuth({ authEmail: inputEmail, authToken: String(Date.now) }))
      navigation.navigate('Main')
    }
    setIsSubmitted(false)
    setInputEmail('')
    setPassword('')
  }

  return (
    <Screen preset="auto" contentContainerStyle={styles.contentContainer} safeAreaEdges={['top', 'bottom']}>
      <Text variant="headlineLarge">Login</Text>
      <TextInput
        value={inputEmail}
        label="Email"
        placeholder="Type your email"
        onChangeText={(nextValue) => setInputEmail(nextValue)}
      />
      <TextInput
        value={password}
        label="Password"
        placeholder="Type your password"
        left={<TextInput.Icon icon="alert-circle-outline" />}
        right={<TextInput.Icon icon={isPasswordVisible ? 'eye' : 'eye-off'} onPress={togglePasswordVisible} />}
        secureTextEntry={!isPasswordVisible}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button onPress={login} mode="outlined">
        Login
      </Button>
    </Screen>
  )
}
