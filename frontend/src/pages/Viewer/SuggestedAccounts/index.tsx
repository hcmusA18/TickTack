import React, { FC, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AppStackScreenProps } from 'navigators'
import { Text } from 'react-native-paper'
import { Screen } from 'components'
import { colors } from 'theme'
import { Navbar } from './components/Navbar'
import { ListAccounts } from './components/ListAccounts'

interface SuggestedAccounsProps extends AppStackScreenProps<'SuggestedAccounts'> {}

type TabType = 'Following' | 'Followers'

const TabItem = ({
  tabName,
  activeTab,
  setActiveTab
}: {
  tabName: TabType
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}) => {
  const isActive = activeTab === tabName
  return (
    <TouchableOpacity style={[styles.tabItem, isActive && styles.activeTab]} onPress={() => setActiveTab(tabName)}>
      <Text style={[styles.tabText, isActive && styles.activeText]}>{tabName}</Text>
    </TouchableOpacity>
  )
}

export const SuggestedAccounts: FC<SuggestedAccounsProps> = (props) => {
  const { navigation } = props
  const [activeTab, setActiveTab] = useState<TabType>('Following')

  const followingAccounts = []
  const followerAccounts = []
  const renderContent = () => {
    switch (activeTab) {
      case 'Following':
        for (let i = 0; i < 10; i++) {
          followingAccounts.push({
            avatar: 'https://source.unsplash.com/random',
            name: 'Tran Gia Thinh',
            followers: '23M'
          })
        }
        return <ListAccounts accounts={followingAccounts} />
      case 'Followers':
        for (let i = 0; i < 10; i++) {
          followerAccounts.push({
            avatar: 'https://source.unsplash.com/random',
            name: 'Lac Thieu Quan',
            followers: '88M'
          })
        }
        return <ListAccounts accounts={followerAccounts} />
      default:
        return null
    }
  }

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <Navbar />
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TabItem tabName="Following" activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabItem tabName="Followers" activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>

      {renderContent()}
      {/* Tab bar */}
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  suggestedAccountsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  suggestedAccountsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  tabItem: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.transparent
  },
  activeTab: {
    borderBottomColor: colors.black
  },
  tabText: {
    fontSize: 16,
    color: colors.textGray
  },
  activeText: {
    color: colors.text,
    fontWeight: 'bold'
  }
})
