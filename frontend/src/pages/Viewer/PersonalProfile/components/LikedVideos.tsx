import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const bgColor = 'orange'

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor
  }
})

export const LikedVideosContent = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>Liked Videos</Text>
    </View>
  )
}
