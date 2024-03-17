import React, { FC, useMemo, useRef, useCallback } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Button } from 'react-native-paper'
import BottomSheet from '@gorhom/bottom-sheet'
import SignupOption, { AuthenOptionProps } from '../../components/SignInOption'
import { colors } from '../../components/MyColors'
import { AppStackScreenProps } from '../../navigators'
import { TopBar } from '../../components/LoginTopBar'
import { useFocusEffect } from '@react-navigation/native'

interface LoginPageProps extends AppStackScreenProps<'Login'> {}

export const LoginPage: FC<LoginPageProps> = (props) => {
  const { navigation } = props

  const sheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => ['25%', '90%'], [])

  // Use useFocusEffect to handle the bottom sheet expansion
  useFocusEffect(
    useCallback(() => {
      // This function is called when the screen comes into focus
      // You can adjust the index based on your snapPoints
      const expandBottomSheet = () => {
        if (sheetRef.current) {
          sheetRef.current.expand() // Or any other index you prefer
        }
      }

      expandBottomSheet()

      return () => {
        // Optional: Any cleanup logic goes here
      }
    }, [])
  )

  const LogInOptionsData: AuthenOptionProps[] = [
    { icon: 'user', text: 'Log in by phone or email', onPress: () => navigation.navigate('SignUpByMail') },
    { icon: 'facebook', text: 'Continue with Facebook', onPress: () => console.log('Continue with Facebook') },
    { icon: 'apple', text: 'Continue with Apple', onPress: () => console.log('Continue with Apple') },
    { icon: 'google', text: 'Continue with Google', onPress: () => console.log('Continue with Google') }
  ]

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
        <TopBar
          firstIcon="help-circle-outline"
          secondIcon="close"
          textContent="Log in to TikTok"
          onFirstIconPress={() => console.log('Help Button Pressed')}
          onSecondIconPress={() => {
            sheetRef.current?.close?.()
            navigation.navigate('Home')
          }}
        />
        {/* Body content */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.optionTextContainer}>
            <Text style={styles.headerText}>Login{'\n'}to TikTok</Text>
          </View>
          {LogInOptionsData.map((option, index) => (
            <SignupOption
              key={index}
              icon={option.icon}
              text={option.text}
              onPress={() => {
                if (option.text === 'Log in by phone or email') {
                  navigation.navigate('LoginByMail')
                }
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
          <Button
            mode="text"
            onPress={() => {
              navigation.navigate('SignUp')
            }}
            uppercase={false}>
            <Text style={styles.bottomBarButtonText}>Sign Up</Text>
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
  // topBar_title: {
  //   flex: 1,
  //   textAlign: 'center',
  //   fontSize: 16,
  // },
  scrollView: {
    paddingHorizontal: '5%'
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
