import React, { FC, useState } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppStackScreenProps } from 'navigators'
import { TopBar } from '../Login/components/LoginTopBar'
import { colors } from '../Login/components/MyColors'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useAppDispatch } from 'libs/redux'
import { setAuthEmail } from 'libs/redux/sliceAuth'

interface SignUpByMailProps extends AppStackScreenProps<'SignUpByMail'> {}

export const SignUpByMail: FC<SignUpByMailProps> = (props) => {
  const navigation = props.navigation
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [activeTab, setActiveTab] = useState('email') // start with 'phone' or 'email'
  const [isValid, setIsValid] = useState(true)

  const dispatch = useAppDispatch()

  const handleTabPress = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab)
  }
  const checkBoxClicked = () => {
    setIsSubscribed(!isSubscribed)
  }

  const handleEmailChange = (text: string) => {
    setEmail(text)
    // Check if the email is valid and update isValid state accordingly
    setIsValid(validateEmail(text))
  }

  const validateEmail = (email: string) => {
    // Regular expression for validating email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const actionLogin = () => {
    console.log(isValid)
    if (isValid && email !== '') {
      dispatch(setAuthEmail(email))
      navigation.navigate('PasswordInputReg')
    }
  }

  const getTopBarText = (activeTab: string) => {
    if (activeTab === 'phone') {
      return (
        <TopBar
          firstIcon="chevron-left"
          secondIcon="help-circle-outline"
          textContent="Using phone number"
          onFirstIconPress={() => navigation.goBack()}
          onSecondIconPress={() => console.log('Help Button Pressed')}
        />
      )
    } else {
      return (
        <TopBar
          firstIcon="chevron-left"
          secondIcon="help-circle-outline"
          textContent="Using email"
          onFirstIconPress={() => navigation.goBack()}
          onSecondIconPress={() => console.log('Help Button Pressed')}
        />
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {getTopBarText(activeTab)}
      <View style={styles.tabContainer}>
        <View style={styles.tab}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'phone' && styles.activeTabButton]}
            onPress={() => handleTabPress('phone')}>
            <Text style={[styles.tabText, activeTab === 'phone' && styles.activeTabText]}>Phone</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'email' && styles.activeTabButton]}
            onPress={() => handleTabPress('email')}>
            <Text style={[styles.tabText, activeTab === 'email' && styles.activeTabText]}>Email</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.indicator, { left: activeTab === 'phone' ? 0 : '50%' }]} />
      </View>
      {/* Input part */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <TextInput
            style={[styles.input, !isValid && styles.invalidInput]} // Apply invalidInput style if email is not valid
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          {!isValid && <Text style={styles.warningText}>Please enter a valid email address</Text>}
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={[styles.checkbox, isSubscribed && styles.checkedCheckbox]} onPress={checkBoxClicked}>
            {isSubscribed && (
              <Icon name={styles.checkBoxIcon.name} size={styles.checkBoxIcon.size} color={styles.checkBoxIcon.color} />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            Get trending content, newsletters, promotions, recommendations, and account updates sent to your email
          </Text>
        </View>
        <Text style={styles.agreementText}>
          By continuing, you agree to TikTok’s <Text style={styles.linkText}>Terms of Service</Text> and confirm that
          you have read TikTok’s <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
        <TouchableOpacity style={styles.nextButton} onPress={actionLogin}>
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
    paddingHorizontal: 16,
    paddingTop: 24
  },
  input: {
    borderBottomColor: colors.palette.ink100,
    borderBottomWidth: 1,
    padding: 16,
    fontSize: 16,
    marginBottom: 6
  },
  invalidInput: {
    borderColor: colors.palette.UIRed // Change border color to indicate invalid input
  },
  warningText: {
    color: colors.palette.UIRed,
    fontSize: 12,
    marginBottom: 8
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.palette.ink100,
    borderRadius: 12, // Half of width/height to make it circular
    // Add more styling for the checkbox
    alignItems: 'center', // Center the check icon horizontally
    justifyContent: 'center' // Center the check icon vertically
  },
  checkedCheckbox: {
    backgroundColor: colors.palette.UIRed
  },
  checkboxText: {
    flex: 1,
    color: colors.palette.ink300
    // Add your text styling
  },
  checkBoxIcon: {
    name: 'check',
    color: colors.palette.pjWhite,
    size: 12
  },
  agreementText: {
    color: colors.palette.ink300,
    marginBottom: 24,
    fontSize: 14
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: colors.palette.pjWhite,
    borderBottomWidth: 2,
    borderBottomColor: colors.palette.grey200
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  activeTabButton: {},
  tabText: {
    fontSize: 16,
    color: colors.palette.grey500
  },
  activeTabText: {
    fontWeight: 'bold',
    color: colors.palette.pjBlack
  },
  indicator: {
    position: 'absolute',
    height: 2,
    width: '50%',
    backgroundColor: colors.palette.pjBlack,
    bottom: -2
  }
})

export default SignUpByMail
