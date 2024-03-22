import React, { FC, useState } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppStackScreenProps } from 'navigators'
import { TopBar } from '../Login/components/LoginTopBar'
import { colors } from '../Login/components/MyColors'
import Icon from 'react-native-vector-icons/FontAwesome'

interface PassWordInputProps extends AppStackScreenProps<'PassWordInput'> {}

export const PassWordInput: FC<PassWordInputProps> = (props) => {
  const navigation = props.navigation
  const [isPasswordHidden, setIsPasswordHidden] = useState(true) // State to track whether password is hidden or shown
  const [isValid, setIsValid] = useState(true)
  const [password, setPassword] = useState('')

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

  const verifyPassword = () => {
    console.log('Password:', password)
    if (isValid) {
      navigation.navigate('Home')
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
        onSecondIconPress={() => {}}
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
        <TouchableOpacity style={styles.nextButton} onPress={verifyPassword}>
          <Text style={styles.nextButtonText}>Next</Text>
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
    paddingVertical: 8,
    alignItems: 'center'
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
    marginBottom: 24
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

export default PassWordInput
