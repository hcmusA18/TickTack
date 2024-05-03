import React, { FC, useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { AccountItem } from 'components'
import axiosInstance from 'libs/utils/axiosInstance'
import Toast from 'react-native-simple-toast'

interface FriendListProps {
  userId: number
}

interface AccountListItem {
  userId: number
  username: string
  avatar: string
  // Add other properties as needed
  [key: string]: any // If there are other properties you're not sure about
}

export const FriendList: FC<FriendListProps> = ({ userId }) => {
  const [accounts, setAccounts] = useState([])

  const getUnfollowingAccounts = async () => {
    try {
      const firstResponse = await axiosInstance.getAxios().get(`/user/unfollowing/${userId}?isFollower=true`)

      if (firstResponse.status !== 200) {
        Toast.show(firstResponse.data.message, Toast.LONG)
        return
      }

      let unfollowingAccounts = firstResponse.data.map((account: AccountListItem) => ({
        ...account,
        followStatus: 1
      }))

      const secondResponse = await axiosInstance.getAxios().get(`/user/unfollowing/${userId}`)

      if (secondResponse.status !== 200) {
        Toast.show(secondResponse.data.message, Toast.LONG)
        return
      }

      unfollowingAccounts = unfollowingAccounts.concat(
        secondResponse.data.map((account: AccountListItem) => ({
          ...account,
          followStatus: 0
        }))
      )

      setAccounts(unfollowingAccounts)
    } catch (error) {
      console.error('Error fetching accounts:', error)
      Toast.show('Error fetching accounts', Toast.LONG)
    }
  }

  useEffect(() => {
    getUnfollowingAccounts()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={accounts}
        renderItem={({ item }) => (
          <AccountItem
            avatar={item.avatar}
            name={item.username}
            followers={100}
            isFriendList={true}
            curFollowStatus={item.followStatus}
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
