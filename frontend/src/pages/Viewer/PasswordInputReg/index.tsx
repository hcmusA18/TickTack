import { useAppSelector } from 'libs/redux'
import axiosInstance from 'libs/utils/axiosInstance'
import { AppStackScreenProps } from 'navigators'
import React, { FC, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TopBar } from '../Login/components/LoginTopBar'
import { colors } from '../Login/components/MyColors'
import { styles } from '../PasswordInput'

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
    if (text !== confirmPassword) {
      setIsPwdMatching(false)
    } else {
      setIsPwdMatching(true)
    }
  }

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text)
    if (password !== text) {
      setIsPwdMatching(false)
    } else {
      setIsPwdMatching(true)
    }
  }

  const validatePassword = (pwd: string) => {
    return pwd.length > 0
  }

  const handleSignup = async () => {
    if (isValid && isPwdMatching) {
      try {
        await axiosInstance
          .getAxios()
          .post('/signup', {
            email,
            password
          })
          .then((response) => {
            Toast.show(response.data.message, Toast.LONG)
            if (response.status === 200) {
              navigation.navigate('Login')
            }
          })
      } catch (error) {
        Toast.show(error.response.data.message, Toast.LONG)
      }
    } else {
      Toast.show('Password is invalid', Toast.LONG)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        firstIcon="chevron-left"
        secondIcon=""
        textContent=""
        onFirstIconPress={() => {
          navigation.goBack()
        }}
        onSecondIconPress={undefined}
      />
      <View style={styles.tabContainer}>
        <Text style={styles.tabText}>Enter password</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <View style={[styles.inputContainer, !isValid && styles.invalidInput]}>
            <TextInput
              style={styles.input}
              onChangeText={handlePasswordChange}
              keyboardType="default"
              secureTextEntry={isPasswordHidden}
              placeholder="Enter your password"
              value={password}
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

export default PassWordInputReg
