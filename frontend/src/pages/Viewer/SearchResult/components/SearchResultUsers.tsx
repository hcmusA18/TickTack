import React, { FC } from 'react'
import { View, Text, FlatList } from 'react-native'
import { AccountItem } from 'components'

interface SearchResultUsersProps {
  searchQuery: string
}
const accounts = Array.from({ length: 20 }, (_, i) => ({
  avatar: 'https://source.unsplash.com/random',
  name: 'Tran Gia Thinh',
  followers: '23M'
}))
export const SearchResultUsers: FC<SearchResultUsersProps> = ({ searchQuery }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={accounts}
        renderItem={({ item }) => (
          <AccountItem avatar={item.avatar} name={item.name} followers={item.followers} isHorizontal={false} />
        )}
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
        ListFooterComponent={<View style={{ height: 120 }} />}
      />
    </View>
  )
}
