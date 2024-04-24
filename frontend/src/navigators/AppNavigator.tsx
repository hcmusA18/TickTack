/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer, NavigatorScreenParams } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { useColorScheme } from 'react-native'
import * as Pages from 'pages'
import { navigationRef, useBackButtonHandler } from './navigationUtilities'
import Config from 'configs'
import { MainNavigator, MainTabParamList } from './MainNavigator'

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
  Main: NavigatorScreenParams<MainTabParamList>
  SavePost: { source: string }
  ProfileEditor: undefined
  FieldEditor: { fieldName: string; fieldValue: string }
  UserProfile: undefined
  SuggestedAccounts: undefined
  VideoPreviewer: { source: string }
  Search: undefined
  SignUpByMail: undefined
  SignUp: undefined
  LoginByMail: undefined
  PassWordInput: undefined
  OnboardingPage: undefined
  UsingGuide: undefined
  SearchResult: { searchQuery: string }
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
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Pages.WelcomePage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={Pages.LoginPage}
        options={{
          headerShown: false
        }}
      />
      {/* 🔥 Here's where your screens go */}
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SavePost"
        component={Pages.SavePostPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ProfileEditor"
        component={Pages.ProfileEditor}
        options={{
          title: 'Edit Profile',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18
          },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="FieldEditor"
        component={Pages.FieldEditor}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={Pages.UserProfilePage} // Use the imported component
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="VideoPreviewer"
        component={Pages.VideoPreviewer}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Search"
        component={Pages.SearchPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SuggestedAccounts"
        component={Pages.SuggestedAccounts} // Use the imported component
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SignUpByMail"
        component={Pages.SignUpByMail}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={Pages.SignUpPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="LoginByMail"
        component={Pages.LoginByMail}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="PassWordInput"
        component={Pages.PassWordInput}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="OnboardingPage"
        component={Pages.OnboardingPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="UsingGuide"
        component={Pages.UsingGuide}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SearchResult"
        component={Pages.SearchResultPage}
        options={{
          headerShown: false
        }}
      />
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
