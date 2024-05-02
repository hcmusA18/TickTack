import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { colors } from 'theme'
import { AccountItem } from 'components/AccountItem'

type Account = {
  avatar: string
  name: string
  followers: string
}

export const ListAccounts = ({ accounts }: { accounts: Account[] }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        {accounts.map((account, _) => (
          <AccountItem key={account.name} {...account} isHorizontal={false} />
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
