import React, { FC } from 'react'
import { View, Text, FlatList } from 'react-native'
import { AccountItem } from 'components'
import { useState, useEffect } from 'react'
import axiosInstance from 'libs/utils/axiosInstance'
import Toast from 'react-native-simple-toast'

interface SearchResultUsersProps {
  searchQuery: string
}
// const accounts = Array.from({ length: 20 }, (_, i) => ({
//   avatar: 'https://source.unsplash.com/random',
//   name: 'Tran Gia Thinh',
//   followers: '23M'
// }))
export const SearchResultUsers: FC<SearchResultUsersProps> = ({ searchQuery }) => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)

  const searchAccounts = async () => {
    try {
      setLoading(true)
      await axiosInstance
        .getAxios()
        .get(`/user/search/Jane?getFull=true`)
        .then((response) => {
          if (response.status === 200) {
            setAccounts(response.data.users)
            setLoading(false)
          } else {
            Toast.show(response.data.message, Toast.LONG)
          }
        })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    searchAccounts()
  }, [searchQuery])

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={accounts}
        renderItem={({ item }) => (
          <AccountItem avatar={item.avatar} name={item.username} followers={item.followers} isHorizontal={false} />
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
