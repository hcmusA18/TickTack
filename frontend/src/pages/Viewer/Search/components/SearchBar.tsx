import { Ionicons } from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { setNeverMeet, setSearchQuery } from 'libs/redux/sliceSearch'
import axiosInstance from 'libs/utils/axiosInstance'
import React, { FC, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import Toast from 'react-native-simple-toast'
import { colors } from 'theme'

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

interface SearchBarProps {
  navigation: any
  onFocus?: () => void
}

export const SearchBar: FC<SearchBarProps> = ({ navigation, onFocus }) => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector((state) => state.search.searchQuery)
  const searchBarRef = useRef(null)
  const [wordCnt, setWordCnt] = useState(searchQuery.length)

  const handleTextChange = async (text: string) => {
    dispatch(setSearchQuery(text))

    if (Math.abs(text.length - wordCnt) > 2 && text.length > 2) {
      const vidResponse = await axiosInstance.getAxios().get(`/video/search/${text}?timestamp=${new Date().getTime()}`)
      let videos = []
      if (vidResponse.status === 200 && vidResponse.data.videos) {
        videos = vidResponse.data.videos.slice(0, 10).map((video: any) => video.text)
        videos = [...new Set(videos)]
      }

      const userResponse = await axiosInstance.getAxios().get(`/user/search/${text}?timestamp=${new Date().getTime()}`)
      let users = []
      if (userResponse.status === 200 && userResponse.data.users) {
        users = userResponse.data.users.slice(0, 10).map((user: any) => user.username)
        users = [...new Set(users)]
      }

      dispatch(setNeverMeet(videos.concat(users)))
      setWordCnt(text.length)
    } else if (text.length === 0) {
      dispatch(setNeverMeet([]))
      setWordCnt(0)
    }
  }

  const performSearch = () => {
    if (onFocus !== undefined) {
      onFocus()
    } else if (searchQuery.length > 0) {
      navigation.navigate('SearchResult')
    } else {
      Toast.show('Please enter a search query', Toast.LONG)
    }
  }

  useEffect(() => {
    if (searchBarRef.current && onFocus === undefined) {
      searchBarRef.current.focus()
    }
  })

  return (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={32} />
      </TouchableOpacity>
      <Searchbar
        ref={searchBarRef}
        placeholder="Search"
        onChangeText={handleTextChange}
        value={searchQuery}
        style={styles.searchInput}
        icon={() => <Ionicons name="search" size={24} />}
        selectionColor={tiktokPink}
        placeholderTextColor={colors.palette.overlay20}
        onFocus={onFocus}
      />
      <TouchableOpacity onPress={performSearch}>
        <Text style={styles.searchBarText}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}
