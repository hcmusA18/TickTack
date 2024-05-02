import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const bgColor = 'red'

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor
  }
})

export const MyVideosContent = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>My Videos</Text>
    </View>
  )
}
