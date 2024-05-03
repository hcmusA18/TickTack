import { Screen } from 'components'
import { useAppSelector, useAppDispatch } from 'libs/redux'
import { AppStackScreenProps } from 'navigators'
import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { SearchBar } from '../Search/components'
import { CategoryBar, SearchResultUsers, SearchResultVideos } from './components'
import { addPreviousSearch } from 'libs/redux/sliceSearch'

interface SearchResultPageProps extends AppStackScreenProps<'SearchResult'> {}

export const SearchResultPage: FC<SearchResultPageProps> = ({ navigation }) => {
  const searchQuery = useAppSelector((state) => state.search.searchQuery)
  const previousSearch = useAppSelector((state) => state.search.previousSearch)
  const dispatch = useAppDispatch()

  if (!previousSearch.includes(searchQuery)) {
    dispatch(addPreviousSearch(searchQuery))
  }

  const categories = ['Top', 'Videos', 'Users']
  const [currentTab, setCurrentTab] = useState(0)
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']}>
      <SearchBar
        navigation={navigation}
        onFocus={() => {
          navigation.navigate('Search')
        }}
      />
      <CategoryBar categories={categories} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <View style={{ display: 'flex', width: '100%', height: '100%' }}>
        {currentTab === 0 && <SearchResultVideos searchQuery={searchQuery} top navigation={navigation} />}
        {currentTab === 1 && <SearchResultVideos searchQuery={searchQuery} top={false} navigation={navigation} />}
        {currentTab === 2 && <SearchResultUsers searchQuery={searchQuery} />}
      </View>
    </Screen>
  )
}
