import { useAppSelector } from 'libs/redux'
import axiosInstance from 'libs/utils/axiosInstance'
import { AppStackScreenProps } from 'navigators'
import React, { FC, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TopBar } from '../Login/components/LoginTopBar'
import { colors } from '../Login/components/MyColors'

interface PasswordInputRegProps extends AppStackScreenProps<'PasswordInput'> {}

export const PassWordInputReg: FC<PasswordInputRegProps> = (props) => {
  const navigation = props.navigation
  const [isPasswordHidden, setIsPasswordHidden] = useState(true) // State to track whether password is hidden or shown
  const [isValid, setIsValid] = useState(true)
  const [isPwdMatching, setIsPwdMatching] = useState(true)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const email = useAppSelector((state) => state.auth.authEmail)

  const checkBoxClicked = () => {
    setIsPasswordHidden(!isPasswordHidden)
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text)
    setIsValid(validatePassword(text))
  }

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text)
    if (password !== confirmPassword) {
      setIsPwdMatching(false)
    } else {
      setIsPwdMatching(true)
    }
  }

  const validatePassword = (pwd: string) => {
    return pwd.length > 0
  }

  const handleSignup = () => {
    return async () => {
      if (isValid && isPwdMatching) {
        try {
          await axiosInstance
            .getAxios()
            .post('/auth/register', {
              email,
              password
            })
            .then((response) => {
              if (response.status === 200) {
                Toast.show('Login successful', Toast.LONG)
                navigation.navigate('OnboardingPage')
              } else {
                Toast.show(response.data.message, Toast.LONG)
              }
            })
        } catch (error) {
          Toast.show('Failed to register: ' + error.response.data.message, Toast.LONG)
        }
      } else {
        Toast.show('Password is invalid', Toast.LONG)
      }
    }
  }

  const getTopBarText = () => {
    return (
      <TopBar
        firstIcon="chevron-left"
        secondIcon=""
        textContent=""
        onFirstIconPress={() => {
          navigation.goBack()
        }}
        onSecondIconPress={undefined}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {getTopBarText()}
      {/* Input part */}
      <View style={styles.tabContainer}>
        <Text style={styles.tabText}>Enter password</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <View style={[styles.inputContainer, !isValid && styles.invalidInput]}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={handlePasswordChange}
              placeholder="Enter your password"
              secureTextEntry={isPasswordHidden} // Dynamically set secureTextEntry based on visibility state
              keyboardType="default"
            />
            <TouchableOpacity onPress={checkBoxClicked}>
              <Icon name={!isPasswordHidden ? 'eye' : 'eye-slash'} size={20} color={colors.palette.ink200} />
            </TouchableOpacity>
          </View>
          {!isValid && <Text style={styles.warningText}>Please enter a valid password</Text>}
        </View>

        <View>
          <View style={[styles.inputContainer, !isValid && styles.invalidInput]}>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              placeholder="Confirm your password"
              secureTextEntry={isPasswordHidden}
              keyboardType="default"
            />
          </View>
          {!isPwdMatching && <Text style={styles.warningText}> Passwords do not match</Text>}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleSignup}>
          <Text style={styles.nextButtonText}>Sign up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.pjWhite
  },
  scrollView: {
    paddingHorizontal: '5%',
    paddingTop: 24
  },
  warningText: {
    color: colors.palette.UIRed,
    fontSize: 12,
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: colors.palette.ink100,
    borderBottomWidth: 1,
    paddingVertical: 6,
    alignItems: 'center',
    marginBottom: 6
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginBottom: 6
  },
  invalidInput: {
    borderColor: colors.palette.UIRed
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16
  },
  linkText: {
    color: colors.palette.ink300,
    fontWeight: 'bold'
  },
  nextButton: {
    backgroundColor: colors.palette.UIRed,
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 24
  },
  nextButtonText: {
    color: colors.palette.pjWhite,
    fontSize: 16,
    fontWeight: '600'
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: '5%'
  },
  tabText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.palette.pjBlack
  }
})

export default PassWordInputReg
