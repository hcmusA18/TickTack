import { createMaterialBottomTabNavigator, MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs'
import { CompositeScreenProps, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppStackParamList, AppStackScreenProps } from './AppNavigator'
import * as Pages from '../pages'
import { colors } from 'theme'
import { TabBarIcon } from './IconConfig'

export type MainTabParamList = {
  Home: { creator: string | null; profile: boolean }
  Camera: undefined
  Profile: undefined
  Notification: undefined
  Friend: undefined
  PersonalProfile: undefined
}

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  MaterialBottomTabScreenProps<MainTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createMaterialBottomTabNavigator<MainTabParamList>()

export const MainNavigator = ({ route }) => {
  // const insets = useSafeAreaInsets()
  const [home, setHome] = useState(true)
  const [isCameraActive, setIsCameraActive] = useState(false)

  const navigatorColor = home ? colors.palette.neutral900 : colors.palette.neutral100

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route)
    setIsCameraActive(routeName === 'Camera')
  }, [route])

  return (
    <Tab.Navigator
      shifting={false}
      barStyle={{
        backgroundColor: navigatorColor,
        display: isCameraActive ? 'none' : 'flex'
      }}
      initialRouteName="Home"
      activeColor={navigatorColor}
      theme={{
        colors: {
          primary: navigatorColor
        }
      }}
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => <TabBarIcon route={route} color={color} home={home} />,
        tabBarLabel: route.name
      })}>
      <Tab.Screen
        name="Home"
        component={Pages.HomePage}
        initialParams={{ profile: false, creator: null }}
        listeners={({ navigation }) => ({
          focus: () => setHome(true),
          blur: () => {
            setHome(false)
            navigation.setParams({ creator: null, profile: false })
          }
        })}
      />
      <Tab.Screen name="Friend" component={Pages.FriendPage} />
      <Tab.Screen
        name="Camera"
        component={Pages.CameraPage}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate('Camera')
          }
        })}
      />
      <Tab.Screen name="Profile" component={Pages.PersonalProfile} />
    </Tab.Navigator>
  )
}
