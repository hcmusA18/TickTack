import React, { FC } from 'react'
import { View, Text } from 'react-native'

interface SearchResultUsersProps {
  searchQuery: string
}

export const SearchResultUsers: FC<SearchResultUsersProps> = ({ searchQuery }) => {
  return (
    <View>
      <Text>Search Result Users</Text>
    </View>
  )
}
