import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { colors } from 'theme'
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

type Account = {
  avatar: string
  name: string
  followers: string
}

export const HorizontalScrollable = ({ accounts }: { accounts: Account[] }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {accounts.map((account, _) => (
          <View key={account.name}>
            <AccountItem {...account} isHorizontal={true} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
