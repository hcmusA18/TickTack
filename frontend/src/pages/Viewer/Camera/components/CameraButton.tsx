import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from 'theme'

interface Props {
  home: boolean
}

const borderColor = {
  left: '#20d5ea',
  right: '#ec376d'
}

const styles = StyleSheet.create({
  container: {
    top: 3,
    width: 45,
    height: 30,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: borderColor.left,
    borderRightWidth: 3,
    borderRightColor: borderColor.right
  }
})

const CameraButton: React.FC<Props> = ({ home }) => {
  return (
    <View style={[styles.container, { backgroundColor: home ? colors.palette.neutral100 : colors.palette.neutral900 }]}>
      <TouchableOpacity activeOpacity={1}>
        <FontAwesome5 name="plus" size={18} color={home ? colors.palette.neutral100 : colors.palette.neutral900} />
      </TouchableOpacity>
    </View>
  )
}

export default CameraButton
