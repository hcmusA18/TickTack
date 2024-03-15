import React, { FC, useMemo, useRef } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { AppStackScreenProps } from '../navigators'
import { spacing } from '../theme'
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

  // const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

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

  return (
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
          <Text style={styles.login_describe}>
            Create a profile, follow other accounts, make your own videos, and more.
          </Text>

          {signupOptionsData.map((option, index) => (
            <SignupOption key={index} icon={option.icon} text={option.text} />
          ))}
        </ScrollView>
        {/* Policy */}
        <View>
          <Text style={styles.policy_text}>
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
    fontSize: 24,
    textAlign: 'center', // This will center the text horizontally
    marginVertical: 20 // This adds vertical space above and below the text
    // You may need to adjust marginVertical as per your design needs
  },
  login_describe: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 10
  },
  policy_text: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 10
  }
})
