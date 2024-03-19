import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from 'theme'
import { useNavigation } from '@react-navigation/native'
import { AccountItem } from 'components/AccountItem'

export const ListAccounts = ({ accounts }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {accounts.map((account, index) => (
          <AccountItem key={index} {...account} isHorizontal={false} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
  },
  scrollViewContent: {
    paddingVertical: 10
  }
})
