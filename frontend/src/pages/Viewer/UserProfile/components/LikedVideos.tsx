import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Avatar } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange'
  }
})

export const LikedVideosContent = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>Liked Videos</Text>
    </View>
  )
}
