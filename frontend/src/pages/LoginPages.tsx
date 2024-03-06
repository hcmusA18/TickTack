import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { AppStackScreenProps } from '../navigators'
import { Screen } from '../components'
import { spacing } from '../theme'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { setAuth } from 'libs/redux/sliceAuth'
import SignupOption from '../components/SignInOption'

interface LoginPageProps extends AppStackScreenProps<'Login'> {}

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
      navigation.navigate('Home')
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
      navigation.navigate('Home')
    }
    setIsSubmitted(false)
    setInputEmail('')
    setPassword('')
  }

  // return (
  //   <Screen preset="auto" contentContainerStyle={styles.contentContainer} safeAreaEdges={['top', 'bottom']}>
  //     <Text variant="headlineLarge">Login</Text>
  //     <TextInput
  //       value={inputEmail}
  //       label="Email"
  //       placeholder="Type your email"
  //       onChangeText={(nextValue) => setInputEmail(nextValue)}
  //     />
  //     <TextInput
  //       value={password}
  //       label="Password"
  //       placeholder="Type your password"
  //       left={<TextInput.Icon icon="alert-circle-outline" />}
  //       right={<TextInput.Icon icon={isPasswordVisible ? 'eye' : 'eye-off'} onPress={togglePasswordVisible} />}
  //       secureTextEntry={!isPasswordVisible}
  //       onChangeText={(nextValue) => setPassword(nextValue)}
  //     />
  //     <Button onPress={login} mode="outlined">
  //       Login
  //     </Button>
  //   </Screen>
  // )

  const signupOptionsData: SignupOptionProps[] = [
    { icon: 'account-outline', text: 'Sign up' },
    { icon: 'facebook', text: 'Continue with Facebook' },
    { icon: 'apple', text: 'Continue with Apple' },
    { icon: 'google', text: 'Continue with Google' },
    { icon: 'line', text: 'Continue with Line' },
    { icon: 'kakao-talk', text: 'Continue with KakaoTalk' }
  ]

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <Button icon="help-circle-outline" onPress={() => console.log('Help Button Pressed')}>
            <Text style={styles.buttonText}>Help</Text>
          </Button>
          <Text style={styles.buttonText}>Log in to Tiktok</Text>
          <Button icon="close" onPress={() => console.log('Cancel Button Pressed')}>
            <Text style={styles.buttonText}>Close</Text>
          </Button>
        </View>

        <View>
          {/* Content */}
          <ScrollView>
            <Text style={styles.login_text}>Sign up for Tiktok</Text>
            <Text>Create a profile, follow other accounts, make your own videos, and more.</Text>

            {signupOptionsData.map((option, index) => (
              <SignupOption key={index} icon={option.icon} text={option.text} />
            ))}
          </ScrollView>
          {/* Policy */}
          <View>
            <Text>
              By continuing with an account located in Vietnam, you agree to out Terms of Service and acknowledge that
              you have read our Privacy Policy
            </Text>
          </View>
          {/* Bottom bar */}
          <View>
            <View>
              <Text>Don't have an account?</Text>
              <Button>
                <Text>Sign up</Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    height: spacing.xxxl, // Adjust height as needed
    flexDirection: 'row',
    justifyContent: 'space-between', // Center elements horizontally
    alignItems: 'center' // Center elements vertically
  },
  buttonText: {
    marginLeft: 10 // Adjust spacing between icon and text as needed
  },
  login_text: {
    fontSize: 24
  }
})
