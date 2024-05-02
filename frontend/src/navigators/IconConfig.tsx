import React from 'react'
import { MaterialCommunityIcons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons'
import CameraButton from 'components/CameraButton'

const iconConfig = {
  Home: { component: FontAwesome, name: 'home' },
  Friend: { component: Feather, name: 'users' },
  Camera: { component: MaterialCommunityIcons, name: 'camera' },
  Notification: { component: MaterialCommunityIcons, name: 'bell-outline' },
  Profile: { component: AntDesign, name: 'user' }
}

export const TabBarIcon = ({ route, ...props }) => {
  if (route.name === 'Camera') {
    return <CameraButton home={props?.home} />
  }

  const { color, size = 24 } = props
  const icon = iconConfig[route.name]
  if (!icon) return null

  const IconComponent = icon.component
  return <IconComponent name={icon.name} size={size} color={color} />
}
