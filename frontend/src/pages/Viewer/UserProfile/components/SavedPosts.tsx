import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

const bgColor = 'yellow'

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor
  }
})

export const SavedPostsContent = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>Saved Videos</Text>
    </View>
  )
}
