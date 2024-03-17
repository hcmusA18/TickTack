/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { useColorScheme } from 'react-native'
import * as Pages from 'pages'
import { navigationRef, useBackButtonHandler } from './navigationUtilities'
import Config from 'configs'

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  // 🔥 Your screens go here
  Home: undefined
  SignUpByMail: undefined
  SignUp: undefined
  LoginByMail: undefined
  PassWordInput: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>
// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Welcome" component={Pages.WelcomePage} />
      <Stack.Screen name="Login" component={Pages.LoginPage} />
      {/* 🔥 Here's where your screens go */}
      <Stack.Screen name="Home" component={Pages.HomePage} />
      <Stack.Screen name="SignUpByMail" component={Pages.SignUpByMail} />
      <Stack.Screen name="SignUp" component={Pages.SignUpPage} />
      <Stack.Screen name="LoginByMail" component={Pages.LoginByMail} />
      <Stack.Screen name="PassWordInput" component={Pages.PassWordInput} />
    </Stack.Navigator>
  )
}

export interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler((routeName: string) => exitRoutes.includes(routeName))
  return (
    <NavigationContainer {...props} ref={navigationRef} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppStack />
    </NavigationContainer>
  )
}
