import React, { FC, useState } from 'react'
import { AppStackScreenProps } from 'navigators'
import { Screen } from 'components'
import { CategoryBar, SearchBar, SearchResultUsers, SearchResultVideos } from './components'
import { View } from 'react-native'

interface SearchResultPageProps extends AppStackScreenProps<'SearchResult'> {}

export const SearchResultPage: FC<SearchResultPageProps> = ({ route, navigation }) => {
  const searchQuery = route.params?.searchQuery ?? ''
  const categories = ['Top', 'Videos', 'Users']
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']}>
      <SearchBar searchQuery={searchQuery} navigation={navigation} />
      <CategoryBar categories={categories} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <View style={{ display: 'flex', width: '100%', height: '100%' }}>
        {currentTab === 0 && <SearchResultVideos searchQuery={searchQuery} top navigation={navigation} />}
        {currentTab === 1 && <SearchResultVideos searchQuery={searchQuery} top={false} navigation={navigation} />}
        {currentTab === 2 && <SearchResultUsers searchQuery={searchQuery} />}
      </View>
    </Screen>
  )
}
