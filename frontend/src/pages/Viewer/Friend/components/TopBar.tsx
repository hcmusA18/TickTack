import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from 'theme'

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    textAlign: 'center'
  }
})

export const TopBar = () => {
  // const { title } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Friend</Text>
    </View>
  )
}
