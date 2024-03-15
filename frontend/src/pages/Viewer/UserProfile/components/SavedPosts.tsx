import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Avatar } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow'
  }
})

export const SavedPostsContent = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>Saved Videos</Text>
    </View>
  )
}
