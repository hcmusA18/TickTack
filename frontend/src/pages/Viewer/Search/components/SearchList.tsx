import React, { FC, useEffect, useState } from 'react'
import { TouchableOpacity, View, StyleSheet, Text, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const tiktokGrey = '#E8E8ED'

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

const styles = StyleSheet.create({
  searchItemTouchable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14
  },
  rightIcon: {
    padding: 6,
    borderRadius: 100,
    backgroundColor: tiktokGrey
  }
})

interface SearchItemProps {
  searched: boolean
  text: string
  onRemove?: () => void
  onClick?: () => void
}

interface SearchListProps {
  searchQuery: string
  navigation?: any
}

const SearchItem: FC<SearchItemProps> = ({ searched, text, onRemove, onClick }) => {
  return (
    <TouchableOpacity style={styles.searchItemTouchable} onPress={onClick}>
      <View style={styles.rightIcon}>
        {searched ? <Ionicons name="time-outline" size={24} /> : <Ionicons name="search" size={24} />}
      </View>
      <Text style={{ flex: 1 }}>{text}</Text>
      {searched ? (
        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onClick}>
          <Ionicons name="return-up-forward-outline" size={24} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )
}

export const SearchList: FC<SearchListProps> = ({ searchQuery, navigation }) => {
  const [queryData, setQueryData] = useState<string[]>([])
  useEffect(() => {
    setQueryData(searchQuery.trim().length === 0 ? previousSearches : (previousSearches.concat(neverMeets) as string[]))
  }, [searchQuery])

  const onRemove = (item: string) => {
    const index = queryData.indexOf(item)
    console.log('remove', index)
    if (index > -1) {
      setQueryData((prev) => {
        const copy = [...prev]
        copy.splice(index, 1)
        return copy
      })
    }
  }

  const filteredData = queryData.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
  return (
    <FlatList
      data={filteredData}
      maxToRenderPerBatch={5}
      initialNumToRender={5}
      windowSize={10}
      renderItem={({ item }) => (
        <SearchItem
          searched={previousSearches.includes(item)}
          text={item}
          onRemove={() => onRemove(item)}
          onClick={() => navigation.navigate('SearchResult', { searchQuery: item })}
        />
      )}
      keyExtractor={(item) => item}
    />
  )
}
