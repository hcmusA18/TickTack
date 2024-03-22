import React, { FC, useState } from 'react'
import { AppStackScreenProps } from 'navigators'
import { Screen } from 'components'
import { CategoryBar, SearchBar, SearchResultUsers, SearchResultVideos } from './components'

interface SearchResultPageProps extends AppStackScreenProps<'SearchResult'> {}

export const SearchResultPage: FC<SearchResultPageProps> = ({ route, navigation }) => {
  const searchQuery = route.params?.searchQuery ?? ''
  const categories = ['Top', 'Video', 'User']
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']}>
      <SearchBar searchQuery={searchQuery} navigation={navigation} />
      <CategoryBar categories={categories} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === 0 && <SearchResultVideos searchQuery={searchQuery} top />}
      {currentTab === 1 && <SearchResultVideos searchQuery={searchQuery} top={false} />}
      {currentTab === 2 && <SearchResultUsers searchQuery={searchQuery} />}
    </Screen>
  )
}
