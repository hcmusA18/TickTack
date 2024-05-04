import React, { FC, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Screen, Feed } from 'components'
import { MainTabScreenProps } from 'navigators'
import { Topbar } from './components'
import { useAppSelector } from 'libs/redux'

interface HomePageProps extends MainTabScreenProps<'Home'> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
})

export const HomePage: FC<HomePageProps> = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState<string>('For You')
  const authToken = useAppSelector((state) => state.auth.authToken)

  useEffect(() => {
    if (!authToken) {
      navigation.navigate('Welcome')
    }
  }, [authToken])

  const changeTab = (tab: string) => {
    setCurrentTab(tab)
  }
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <Topbar changeTab={changeTab} currentTab={currentTab} navigation={navigation} />
      <Feed profile={false} currentTab={currentTab} />
    </Screen>
  )
}
