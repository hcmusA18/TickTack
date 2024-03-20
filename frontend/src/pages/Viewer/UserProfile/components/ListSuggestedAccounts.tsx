import React from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { colors } from 'theme'
import { Feather } from '@expo/vector-icons'
import { AccountItem } from 'components/AccountItem'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
    // backgroundColor: colors.white,
    // paddingVertical: 10,
  },
  scrollContainer: {
    paddingVertical: 10
  }
})

export const HorizontalScrollable = ({ accounts }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {accounts.map((account, index) => (
          <View key={index}>
            <AccountItem {...account} isHorizontal={true} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
