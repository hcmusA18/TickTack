import { Screen } from 'components'
import { useAppSelector } from 'libs/redux'
import { AppStackScreenProps } from 'navigators'
import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { SearchBar } from '../Search/components'
import { CategoryBar, SearchResultUsers, SearchResultVideos } from './components'

interface SearchResultPageProps extends AppStackScreenProps<'SearchResult'> {}

export const SearchResultPage: FC<SearchResultPageProps> = ({ navigation }) => {
  const searchQuery = useAppSelector((state) => state.search.searchQuery)
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
