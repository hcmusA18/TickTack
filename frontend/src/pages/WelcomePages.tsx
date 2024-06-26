import React, { FC, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Screen } from '../components'
import { AppStackScreenProps } from '../navigators'
import { Button } from 'react-native-paper'
import { spacing } from '../theme'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { setFirstOpen } from 'libs/redux/sliceAuth'

interface WelcomePageProps extends AppStackScreenProps<'Welcome'> {}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: '57%',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg
  },
  welcomeTextStyles: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export const WelcomePage: FC<WelcomePageProps> = (props) => {
  const { navigation } = props
  const { firstOpen, authToken } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (authToken) {
      navigation.navigate('Main')
    }
    if (firstOpen) {
      navigation.navigate('OnboardingPage')
    }
  }, [authToken, firstOpen])

  const goNext = () => {
    if (firstOpen || !authToken) {
      dispatch(setFirstOpen())
      navigation.navigate('OnboardingPage')
    } else if (authToken) {
      navigation.navigate('Main')
    } else {
      navigation.navigate('Login')
    }
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.welcomeTextStyles}>Welcome to TickTack</Text>
        <Button onPress={goNext}>Go to Login</Button>
      </View>
    </Screen>
  )
}
