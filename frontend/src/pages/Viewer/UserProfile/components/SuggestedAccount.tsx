import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { colors } from 'theme'
import { Feather } from '@expo/vector-icons'
import { HorizontalScrollable } from './ListSuggestedAccounts'

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.background
    // backgroundColor: colors.palette.neutral600
  },
  headContainer: {
    paddingHorizontal: 15,
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
    // alignItems: "center"
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: colors.textGray,
    textAlignVertical: 'center',
    marginRight: 5
  }
})

export const SuggestedAccount = (props: any) => {
  return (
    <View style={styles.container}>
      {/* Head Container */}
      <View style={styles.headContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.text}>Suggested accounts</Text>
          <Feather name={'info'} size={16}></Feather>
        </View>

        <TouchableOpacity style={styles.rightContainer}>
          <Text style={styles.text}>View all</Text>
          <Feather name={'chevron-right'} size={18}></Feather>
        </TouchableOpacity>
      </View>
      {/* Head Container */}

      {/* Suggested Accounts */}
      <HorizontalScrollable
        accounts={[
          {
            avatar: 'https://source.unsplash.com/random',
            name: 'Tran Gia Thinh',
            followers: '23'
          },
          {
            avatar: 'https://source.unsplash.com/random',
            name: 'Tran Gia Thinh',
            followers: '45'
          },
          {
            avatar: 'https://source.unsplash.com/random',
            name: 'Tran Gia Thinh',
            followers: '77K'
          },
          {
            avatar: 'https://source.unsplash.com/random',
            name: 'Tran Gia Thinh',
            followers: '23M'
          }
        ]}
      />
      {/* Suggested Accounts */}
    </View>
  )
}
