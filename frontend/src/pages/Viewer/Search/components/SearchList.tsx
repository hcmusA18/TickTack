import { Ionicons } from '@expo/vector-icons'
import { useAppSelector, useAppDispatch } from 'libs/redux'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { setSearchQuery } from 'libs/redux/sliceSearch'

const tiktokGrey = '#E8E8ED'

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

export const SearchList: FC<SearchListProps> = ({ navigation }) => {
  const searchQuery = useAppSelector((state) => state.search.searchQuery)
  const previousSearch = useAppSelector((state) => state.search.previousSearch)
  const neverMeet = useAppSelector((state) => state.search.neverMeet)

  const dispatch = useAppDispatch()

  const [queryData, setQueryData] = useState<string[]>([])
  useEffect(() => {
    console.log(previousSearch, neverMeet)
    setQueryData(searchQuery.trim().length === 0 ? previousSearch : previousSearch.concat(neverMeet))
  }, [previousSearch, neverMeet])

  const onRemove = (item: string) => {
    const index = queryData.indexOf(item)
    if (index > -1) {
      setQueryData((prev) => {
        const copy = [...prev]
        copy.splice(index, 1)
        return copy
      })
    }
  }

  return (
    <FlatList
      data={queryData}
      maxToRenderPerBatch={5}
      initialNumToRender={5}
      windowSize={10}
      renderItem={({ item }) => (
        <SearchItem
          searched={previousSearch.includes(item)}
          text={item}
          onRemove={() => onRemove(item)}
          onClick={() => {
            dispatch(setSearchQuery(item))
            navigation.navigate('SearchResult')
          }}
        />
      )}
      keyExtractor={(item) => item}
    />
  )
}
