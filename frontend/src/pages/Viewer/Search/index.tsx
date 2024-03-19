import React, { FC } from 'react'
import { TouchableOpacity, View, StyleSheet, Text, FlatList } from 'react-native'
import { colors } from 'theme'
import { Ionicons } from '@expo/vector-icons'
import { AppStackScreenProps } from 'navigators'
import { Screen } from 'components'
import { Searchbar } from 'react-native-paper'

interface SearchPageProps extends AppStackScreenProps<'Search'> {}

const tiktokPink = '#E6436D'
const tiktokGrey = '#E8E8ED'

const styles = StyleSheet.create({
  searchBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  backIcon: {
    marginStart: 8,
    padding: 0
  },
  searchInput: {
    flex: 5,
    borderRadius: 6,
    backgroundColor: tiktokGrey
  },
  searchBarText: {
    color: tiktokPink,
    fontWeight: 'bold',
    marginEnd: 8
  }
})

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.backIcon}>
        <Ionicons name="chevron-back-outline" size={32} />
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchInput}
        icon={() => <Ionicons name="search" size={24} />}
        selectionColor={tiktokPink}
        placeholderTextColor={colors.palette.overlay20}
      />
      <Text style={styles.searchBarText}>Search</Text>
    </View>
  )
}

const previousSearches = [
  'cat',
  'dog',
  'funny',
  'food',
  'dance',
  'music',
  'art',
  'gaming',
  'sports',
  'travel',
  'fashion',
  'beauty',
  'education',
  'science',
  'technology',
  'history',
  'politics',
  'news',
  'covid',
  'vaccine',
  'cute',
  'tiktok'
]

const neverMeets = [
  'food tiktok',
  'dance tiktok',
  'game tiktok',
  'music tiktok',
  'food eating video',
  'food mukbang',
  'movie hot',
  'movie action',
  'review',
  'food review',
  'movie review',
  'game review',
  'funny video'
]

const SearchItem = (searched: boolean, text: string) => {
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 14
      }}>
      <View style={{ backgroundColor: tiktokGrey, padding: 6, borderRadius: 100 }}>
        {searched ? <Ionicons name="time-outline" size={24} /> : <Ionicons name="search" size={24} />}
      </View>
      <Text style={{ flex: 1 }}>{text}</Text>
      {searched ? <Ionicons name="close" size={24} /> : <Ionicons name="return-up-forward-outline" size={24} />}
    </TouchableOpacity>
  )
}

const SearchRecommends = ({ searchQuery }: { searchQuery: string }) => {
  const queryData =
    searchQuery.trim().length === 0 ? previousSearches : (previousSearches.concat(neverMeets) as string[])
  const filteredData = queryData.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
  return (
    <FlatList
      data={filteredData}
      maxToRenderPerBatch={5}
      initialNumToRender={5}
      windowSize={10}
      renderItem={({ item }) => SearchItem(previousSearches.includes(item), item)}
      keyExtractor={(item) => item}
    />
  )
}

export const SearchPage: FC<SearchPageProps> = (props) => {
  const [searchQuery, setSearchQuery] = React.useState('')
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SearchRecommends searchQuery={searchQuery} />
    </Screen>
  )
}
