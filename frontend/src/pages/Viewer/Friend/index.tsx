import React, { FC, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { MainTabScreenProps } from 'navigators'
import { colors } from 'theme'
import { Screen } from 'components'
import { TopBar, FriendList } from './components'

interface FriendPageProps extends MainTabScreenProps<'Friend'> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.palette.neutral100
  },
  text: {
    fontSize: 20,
    color: colors.palette.neutral700
  }
})

export const FriendPage: FC<FriendPageProps> = ({ navigation }) => {
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']}>
      <TopBar />
      <View style={{ display: 'flex', width: '100%', height: '100%' }}>
        <FriendList userId={1} />
      </View>
    </Screen>
  )
}
