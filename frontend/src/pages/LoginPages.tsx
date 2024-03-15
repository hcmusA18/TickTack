import React, { FC, useMemo, useRef } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text, Button, Icon, IconButton } from 'react-native-paper'
import { AppStackScreenProps } from '../navigators'
import SignupOption, { SignupOptionProps } from '../components/SignInOption'
import BottomSheet from '@gorhom/bottom-sheet'

interface LoginPageProps extends AppStackScreenProps<'Login'> {}

export const LoginPage: FC<LoginPageProps> = (props) => {
  const { navigation } = props

  // ref
  const sheetRef = useRef<BottomSheet>(null)

  const signupOptionsData: SignupOptionProps[] = [
    { icon: 'user', text: 'Sign up' },
    { icon: 'facebook', text: 'Continue with Facebook' },
    { icon: 'apple', text: 'Continue with Apple' },
    { icon: 'google', text: 'Continue with Google' }
  ]

  const snapPoints = useMemo(() => ['25%', '90%'], [])

  // callbacks
  const handleSheetChange = (index) => {
    console.log(index)
    const isUnder30Percent = index === 0 // Assuming snapPoints are set accordingly (e.g., ['0%', '30%'])

    if (isUnder30Percent) {
      // Close the bottom sheet only if it's currently open
      sheetRef.current?.close?.()
      navigation.navigate('Welcome')
    }
  }

  const getTopBarIcon = (btnName: string, btnSize: number, onPressFunc) => {
    return <IconButton size={btnSize} icon={btnName} onPress={onPressFunc} />
  }

  return (
    <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints} onChange={handleSheetChange}>
      <View style={styles.contentContainer}>
        {/* Top bar */}
        <View style={styles.topBar}>
          {getTopBarIcon('help-circle-outline', 30, () => console.log('Help Button Pressed'))}
          <Text style={styles.topBar_title}>Log in to Tiktok</Text>
          {getTopBarIcon('close', 30, () => console.log('Cancel Button Pressed'))}
        </View>
        <View>
          {/* Content */}
          <ScrollView>
            <Text style={styles.login_text}>Sign up for Tiktok</Text>
            <Text style={styles.login_describe}>
              Create a profile, follow other accounts, make your own videos, and more.
            </Text>

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
          <View>
            <Text style={styles.policy_text}>
              By continuing with an account located in Vietnam, you agree to out Terms of Service and acknowledge that
              you have read our Privacy Policy
            </Text>
          </View>
        </View>
        {/* Bottom bar - Positioned absolutely to the bottom */}
        <View style={styles.bottomBar}>
          <Text style={styles.bottomBar_text}>Don"t have an account?</Text>
          <Button mode="text" onPress={() => console.log('Sign Up Button Pressed')}>
            <Text>Sign up</Text>
          </Button>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1
  // },
  topBar: {
    flexDirection: 'row', // Aligns children in a row
    justifyContent: 'space-between', // Distributes children evenly with space between them
    alignItems: 'center', // Aligns children vertically in the center
    padding: 10 // Add padding around the edges if needed
  },
  topBar_title: {
    flex: 1, // Takes up all available space
    textAlign: 'center', // Centers the text horizontally
    fontSize: 16
  },
  login_text: {
    fontSize: 24,
    textAlign: 'left', // This will center the text horizontally
    marginVertical: 10 // This adds vertical space above and below the text
    // You may need to adjust marginVertical as per your design needs
  },
  login_describe: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 40
  },
  policy_text: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 10
  },
  bottomBar: {
    position: 'absolute', // This positions the view out of the normal flow and places it relative to its first positioned (not static) ancestor
    bottom: 0, // This positions the view at the bottom of its container
    width: '100%', // This makes the view stretch across the screen
    backgroundColor: 'white', // Optional, for better visibility
    padding: 30, // Adjust the padding as needed
    borderTopWidth: 1, // Optional, to add a line at the top of the bottom bar
    borderColor: 'grey', // Color for the border line
    alignItems: 'center' // Center the content horizontally
  },
  bottomBar_text: {
    marginBottom: 10 // Space between text and button
  },
  contentContainer: {
    flex: 1
  }
})
