import React, { FC, useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { AccountItem } from 'components'
import axiosInstance from 'libs/utils/axiosInstance'
import Toast from 'react-native-simple-toast'
import { useAppSelector } from 'libs/redux'
import { log } from 'console'

interface SearchResultUsersProps {}
export const SearchResultUsers: FC<SearchResultUsersProps> = () => {
  const [accounts, setAccounts] = useState([])

  const searchQuery = useAppSelector((state) => state.search.searchQuery)
  const loggedUser = useAppSelector((state) => state.auth.user)
  const loggedUserId = loggedUser?.userId ?? 1

  const searchAccounts = async () => {
    try {
      const response = await axiosInstance
        .getAxios()
        .get(`/user/search/${searchQuery}?getFull=true&timestamp=${new Date().getTime()}`)

      if (response.status !== 200) {
        Toast.show(response.data.message, Toast.LONG)
        return
      }

      const { users, numFollowers } = response.data

      const transformedAccounts = users.map((user, i) => ({
        ...user,
        followers: numFollowers[i] || 0
      }))

      setAccounts(transformedAccounts)
    } catch (error) {
      console.error('Error fetching accounts:', error)
      Toast.show('Error fetching accounts', Toast.LONG)
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
          <AccountItem
            userId={loggedUserId}
            accountId={item.userId}
            avatar={item.avatar}
            name={item.username}
            followers={item.followers}
            isFriendList={false}
            curFollowStatus={0}
            isHorizontal={false}
          />
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
