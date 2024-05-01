import React, { FC } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from 'theme'
import { Ionicons } from '@expo/vector-icons'
import { Searchbar } from 'react-native-paper'

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
  searchQuery: string
  navigation: any
}

export const SearchBar: FC<SearchBarProps> = ({ searchQuery, navigation }) => {
  return (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={32} />
      </TouchableOpacity>
      <Searchbar
        placeholder="Search"
        editable={false}
        value={searchQuery}
        style={styles.searchInput}
        icon={() => <Ionicons name="search" size={24} />}
        selectionColor={tiktokPink}
        placeholderTextColor={colors.palette.overlay20}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.searchBarText}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}
