import React, { FC, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Screen } from 'components'
import { MainTabScreenProps } from 'navigators'
import { Topbar, Feed } from './components'
import Feather from '@expo/vector-icons/Feather'
import { colors } from 'theme'

interface HomePageProps extends MainTabScreenProps<'Home'> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
})

const BackBar: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        zIndex: 1000
      }}>
      <Feather name="arrow-left" size={24} color={colors.palette.neutral100} />
      <Text style={{ color: colors.palette.neutral100 }}>Back</Text>
    </TouchableOpacity>
  )
}

export const HomePage: FC<HomePageProps> = ({ navigation, route }) => {
  const [currentTab, setCurrentTab] = useState<string>('For You')

  const { creator, profile } = route.params
  console.log('creator', creator, 'profile', profile)

  const changeTab = (tab: string) => {
    setCurrentTab(tab)
  }
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      {!profile ? (
        <Topbar changeTab={changeTab} currentTab={currentTab} navigation={navigation} />
      ) : (
        <BackBar navigation={navigation} />
      )}
      <Feed creator={creator} profile={profile} currentTab={currentTab} />
    </Screen>
  )
}
