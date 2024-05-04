import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { MainTabScreenProps } from 'navigators'
import { colors } from 'theme'
import { Screen } from 'components'
import { TopBar, FriendList } from './components'
import { useAppSelector } from 'libs/redux'

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

export const FriendPage: FC<FriendPageProps> = () => {
  const user = useAppSelector((state) => state.auth.user)
  const userId = user?.userId ?? 1

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']}>
      <TopBar />
      <View style={{ display: 'flex', width: '100%', height: '100%' }}>
        <FriendList userId={userId} />
      </View>
    </Screen>
  )
}
