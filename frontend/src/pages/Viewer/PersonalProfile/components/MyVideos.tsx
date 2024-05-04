import { AuthUser } from 'libs/types'
import axiosInstance from 'libs/utils/axiosInstance'
import React, { FC, useEffect, useState } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { VideoItem } from '../../SearchResult/components/VideoItem'
import { User } from 'libs/types'
import { TabType } from '../index'

interface MyVideosContentProps {
  navigation: any
  type: TabType
  user: AuthUser
  focusKey: number
}

export const MyVideosContent: FC<MyVideosContentProps> = ({ navigation, type, user, focusKey }) => {
  const [posts, setPosts] = useState({} as any)

  const userId = user ? user.userId : -1
  const url = type === TabType.MyVideos ? `/user/video/${userId}` : `/user/video/liked/${userId}`

  const fetchData = async () => {
    const response = await axiosInstance.getAxios().get(url)
    if (response.status === 200 && response.data) {
      setPosts(response.data.videos)
    }
  }

  useEffect(() => {
    fetchData()
  }, [focusKey])

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={({ item, index }) =>
          index < posts.length - (posts.length % 2) && (
            <VideoItem video={item} navigation={navigation} creatorPost={posts} />
          )
        }
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={4}
        maxToRenderPerBatch={5}
        numColumns={2}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  )
}
