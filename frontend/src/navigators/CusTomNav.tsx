import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const focusColor = '#673ab7'
const defaultColor = '#222'

// Custom Tab Bar Component
const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', height: 60 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.tabBarLabel ?? options.title ?? route.name
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            onPress={onPress}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {label === 'Home' && <FontAwesome name="home" size={24} color={isFocused ? focusColor : defaultColor} />}
            {/* ... handle other icons similarly */}
            <Text style={{ color: isFocused ? focusColor : defaultColor }}>{label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default CustomTabBar
