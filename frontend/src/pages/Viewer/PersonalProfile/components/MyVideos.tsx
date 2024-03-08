import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Avatar } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  }
})

export const MyVideosContent = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>My Videos</Text>
    </View>
  )
}
