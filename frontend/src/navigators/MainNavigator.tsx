import { createMaterialBottomTabNavigator, MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppStackParamList, AppStackScreenProps } from './AppNavigator'
import * as Pages from '../pages'
import { MaterialCommunityIcons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons'
import CameraButton from '../components/CameraButton'

export type MainTabParamList = {
  Home: undefined
  Camera: undefined
  Profile: undefined
  Notification: undefined
  Friend: undefined
}

export type MainTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  MaterialBottomTabScreenProps<MainTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createMaterialBottomTabNavigator<MainTabParamList>()

const EmptyPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Empty Page</Text>
    </View>
  )
}

export const MainNavigator = () => {
  const insets = useSafeAreaInsets()
  const [home, setHome] = useState(true)

  return (
    <Tab.Navigator
      shifting={false}
      barStyle={{
        backgroundColor: home ? '#000' : '#fff'
      }}
      initialRouteName="Home"
      activeColor={home ? '#fff' : '#000'}
      theme={{
        colors: {
          primary: home ? '#000' : '#fff'
        }
      }}>
      <Tab.Screen
        name="Home"
        component={Pages.HomePage}
        listeners={{
          focus: () => setHome(true),
          blur: () => setHome(false)
        }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Friend"
        component={EmptyPage}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Pages.CameraPage}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()

            navigation.navigate('Camera')
          }
        })}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <CameraButton home={home} />
        }}
      />
      <Tab.Screen
        name="Notification"
        component={EmptyPage}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bell-outline" size={24} color={color} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={EmptyPage}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />
        }}
      />
    </Tab.Navigator>
  )
}
