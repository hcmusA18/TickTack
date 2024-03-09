import React, { FC, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { AppStackScreenProps } from '../navigators'
import { Screen } from '../components'
import { spacing } from '../theme'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { setAuth } from 'libs/redux/sliceAuth'
import SignupOption from '../components/SignInOption'

import BottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet'

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
    if (!isBtmShtActive) {
      setBtmShtActive(true)
    }
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

  // ref
  const sheetRef = useRef<BottomSheet>(null)
  const [isBtmShtActive, setBtmShtActive] = useState<boolean>(false)

  const signupOptionsData: SignupOptionProps[] = [
    { icon: 'account-outline', text: 'Sign up' },
    { icon: 'facebook', text: 'Continue with Facebook' },
    { icon: 'apple', text: 'Continue with Apple' },
    { icon: 'google', text: 'Continue with Google' },
    { icon: 'line', text: 'Continue with Line' },
    { icon: 'kakao-talk', text: 'Continue with KakaoTalk' }
  ]

  const snapPoints = useMemo(() => ['25%', '90%'], [])

  // const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  const handleSheetChange = (index) => {
    console.log(index)
    const isUnder30Percent = index === 0 // Assuming snapPoints are set accordingly (e.g., ['0%', '30%'])
    setBtmShtActive(isUnder30Percent)

    if (isUnder30Percent) {
      // Close the bottom sheet only if it's currently open
      // sheetRef.current?.close?.()
      navigation.navigate('Home', (params = { sheetRef }))
    }
  }

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index)
  }, [])
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close()
  }, [])

  // render
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  )

  return (
    // <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>

    // </Screen>

    <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints} onChange={handleSheetChange}>
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
            By continuing with an account located in Vietnam, you agree to out Terms of Service and acknowledge that you
            have read our Privacy Policy
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
    </BottomSheet>
  )
}

const btSheetStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  }
})

const styles = StyleSheet.create({
  // container: {
  //   flex: 1
  // },
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
  },
  container: {
    flex: 1,
    paddingTop: 200
  },
  contentContainer: {
    backgroundColor: 'white'
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee'
  }
})
