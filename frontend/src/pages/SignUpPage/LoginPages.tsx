import React, { FC, useMemo, useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { Button, IconButton } from 'react-native-paper'
import BottomSheet from '@gorhom/bottom-sheet'
import SignupOption, { SignupOptionProps } from '../../components/SignInOption'
import { colors } from './MyColors'

interface LoginPageProps extends AppStackScreenProps<'Login'> {}

export const LoginPage: FC<LoginPageProps> = ({ navigation }) => {
  const sheetRef = useRef<BottomSheet>(null)

  const signupOptionsData: SignupOptionProps[] = [
    { icon: 'user', text: 'Log in' },
    { icon: 'facebook', text: 'Continue with Facebook' },
    { icon: 'apple', text: 'Continue with Apple' },
    { icon: 'google', text: 'Continue with Google' }
  ]

  const snapPoints = useMemo(() => ['25%', '90%'], [])

  const handleSheetChange = (index: number) => {
    console.log(index)
    const isUnder30Percent = index === 0
    if (isUnder30Percent) {
      sheetRef.current?.close?.()
      navigation.navigate('Welcome')
    }
  }

  const handlePressTermsOfService = () => {
    // Code to handle 'Terms of Service' link press
  }

  const handlePressPrivacyPolicy = () => {
    // Code to handle 'Privacy Policy' link press
  }

  const handlePressCookiesPolicy = () => {
    // Code to handle 'Cookies Policy' link press
  }

  return (
    <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints} onChange={handleSheetChange}>
      <View style={styles.contentContainer}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <IconButton icon="help-circle-outline" size={28} onPress={() => console.log('Help Button Pressed')} />
          {/* <Text style={styles.topBar_title}>Log in to TikTok</Text> */}
          <IconButton icon="close" size={28} onPress={() => console.log('Cancel Button Pressed')} />
        </View>
        {/* Body content */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.headerText}>Sign up{'\n'}for TikTok</Text>
          </View>
          {signupOptionsData.map((option, index) => (
            <SignupOption
              key={index}
              icon={option.icon}
              text={option.text}
              onPress={() => {
                console.log(option.text)
              }}
            />
          ))}
        </ScrollView>
        {/* Policy */}
        <View style={styles.policyContainer}>
          <Text style={styles.policyText}>
            By continuing, you agree to our{' '}
            <Text style={styles.boldText} onPress={handlePressTermsOfService}>
              Terms of Service
            </Text>{' '}
            and acknowledge that you have read our{' '}
            <Text style={styles.boldText} onPress={handlePressPrivacyPolicy}>
              Privacy Policy
            </Text>{' '}
            to learn how we collect, use, and share your data and our{' '}
            <Text style={styles.boldText} onPress={handlePressCookiesPolicy}>
              Cookies Policy
            </Text>{' '}
            to learn how we use cookies.
          </Text>
        </View>
        {/* Bottom bar */}
        <View style={styles.bottomBar}>
          <Text style={styles.bottomBar_text}>Don't have an account?</Text>
          <Button mode="text" onPress={() => console.log('Sign Up Button Pressed')} uppercase={false}>
            <Text style={styles.bottomBarButtonText}>Log in</Text>
          </Button>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between' // Ensures that the bottomBar sticks to the bottom
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  // topBar_title: {
  //   flex: 1,
  //   textAlign: 'center',
  //   fontSize: 16,
  // },
  scrollView: {
    paddingHorizontal: 16
  },
  optionTextContainer: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 32
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'left'
  },
  policyContainer: {
    width: '80%',
    alignSelf: 'center',
    padding: 16,
    marginTop: 16,
    marginBottom: 20, // This value should be equal to the bottomBar's height to make sure it sits just above it
    justifyContent: 'center',
    alignItems: 'center'
  },
  policyText: {
    textAlign: 'center', // Center the text
    fontSize: 14 // Set your desired font size
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.palette.ink300
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.palette.UIGrey
  },
  bottomBar_text: {
    fontSize: 16
  },
  bottomBarButtonText: {
    color: colors.palette.UIRed,
    fontSize: 16
  }
})

export default LoginPage
