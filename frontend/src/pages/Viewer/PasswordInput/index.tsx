import { useAppDispatch, useAppSelector } from 'libs/redux'
import { setAuthToken, setAuthUser } from 'libs/redux/sliceAuth'
import axiosInstance from 'libs/utils/axiosInstance'
import { AppStackScreenProps } from 'navigators'
import React, { FC, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TopBar } from '../Login/components/LoginTopBar'
import { colors } from '../Login/components/MyColors'
import { styles } from './styles'

interface PassWordInputProps extends AppStackScreenProps<'PasswordInput'> {}

export const PasswordInput: FC<PassWordInputProps> = (props) => {
  const navigation = props.navigation
  const [isPasswordHidden, setIsPasswordHidden] = useState(true) // State to track whether password is hidden or shown
  const [isValid, setIsValid] = useState(true)
  const [password, setPassword] = useState('')

  const email = useAppSelector((state) => state.auth.authEmail)
  const dispatch = useAppDispatch()

  const checkBoxClicked = () => {
    setIsPasswordHidden(!isPasswordHidden)
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text)
    setIsValid(validatePassword(text))
  }

  const validatePassword = (pwd: string) => {
    return pwd.length > 0
  }

  const verifyPassword = async () => {
    if (!isValid) {
      console.error('Password is invalid')
      Toast.show('Please enter a valid password', Toast.LONG)
      return
    }
    try {
      const response = await axiosInstance.getAxios().post('/signin', {
        email,
        password
      })
      if (response.status === 200) {
        const token = response.data.data
        dispatch(setAuthToken(token))
        axiosInstance.setAuthToken(token)
        console.log('Login successful')
        const userId = await axiosInstance.getAxios().get(`/user/email/${email}`)
        dispatch(setAuthUser(userId.data))
        navigation.navigate('Main')
        Toast.show('Login successful', Toast.LONG)
      } else {
        Toast.show(response.data.message, Toast.LONG)
      }
    } catch (error) {
      console.error('Error while logging in:', error)
      Toast.show('Error while logging in', Toast.LONG)
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

        <TouchableOpacity style={styles.checkboxContainer}>
          <Text style={styles.linkText}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => verifyPassword()}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PasswordInput
