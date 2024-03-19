import React, { FC, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Screen } from 'components'
import { MainTabScreenProps } from 'navigators'
import { Topbar, Feed } from './components'

interface HomePageProps extends MainTabScreenProps<'Home'> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
})

export const HomePage: FC<HomePageProps> = ({ navigation, route }) => {
  const [currentTab, setCurrentTab] = useState<string>('For You')

  const { creator, profile } = route.params

  const changeTab = (tab: string) => {
    setCurrentTab(tab)
  }
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <Topbar currentTab={currentTab} changeTab={changeTab} navigation={navigation} />
      <Feed creator={creator} profile={profile} currentTab={currentTab} />
    </Screen>
  )
}
