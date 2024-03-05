import { createMaterialBottomTabNavigator, MaterialBottomTabScreenProps } from 'react-native-paper/react-navigation'
import { CompositeScreenProps } from '@react-navigation/native'
import React from 'react'
import { TextStyle, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, spacing, typography } from '../theme'
import { AppStackParamList, AppStackScreenProps } from './AppNavigator'
import * as Pages from '../pages'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export type MainTabParamList = {
  Home: undefined
  Camera: undefined
}

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  MaterialBottomTabScreenProps<MainTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createMaterialBottomTabNavigator<MainTabParamList>()

export const MainNavigator = () => {
  const insets = useSafeAreaInsets()
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{ backgroundColor: colors.background, paddingBottom: insets.bottom }}>
      <Tab.Screen name="Home" component={Pages.HomePage} />
      <Tab.Screen name="Camera" component={Pages.CameraPage} />
    </Tab.Navigator>
  )
}

// Camera stack navigator
// const CameraStack = createNativeStackNavigator()

// const CameraStackScreen = () => {
//   const insets = useSafeAreaInsets()

//   return (
//     <CameraStack.Navigator>
//       <CameraStack.Screen name="CameraStack" component={Pages.CameraPage} options={{ headerShown: false }} />
//       <CameraStack.Screen
//         name="SavePost"
//         component={Pages.SavePostPage}
//         options={{
//           headerShown: false
//         }}
//       />
//     </CameraStack.Navigator>
//   )
// }
