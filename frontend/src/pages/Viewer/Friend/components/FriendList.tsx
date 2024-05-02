import React, { FC, useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { AccountItem } from 'components'
import axiosInstance from 'libs/utils/axiosInstance'
import Toast from 'react-native-simple-toast'

interface FriendListProps {
  userId: number
}
export const FriendList: FC<FriendListProps> = ({ userId }) => {
  const [accounts, setAccounts] = useState([])

  const getUnfollowingAccounts = async () => {
    try {
      const response = await axiosInstance.getAxios().get(`/user/unfollowing/${userId}`)

      if (response.status !== 200) {
        Toast.show(response.data.message, Toast.LONG)
        return
      }

      const unfollowingAccounts = response.data

      setAccounts(unfollowingAccounts)
    } catch (error) {
      console.error('Error fetching accounts:', error)
      Toast.show('Error fetching accounts', Toast.LONG)
    }
  }

  useEffect(() => {
    getUnfollowingAccounts()
  }, [userId])

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={accounts}
        renderItem={({ item }) => (
          <AccountItem avatar={item.avatar} name={item.username} followers={100} isHorizontal={false} />
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
