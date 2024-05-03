import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { VideoItem } from '../../SearchResult/components/VideoItem'
import axiosInstance from 'libs/utils/axiosInstance'
import { useAppSelector } from 'libs/redux'
import { AuthUser } from 'libs/types'
import { TabType } from '../index'

const bgColor = 'red'

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor
  }
})

interface MyVideosContentProps {
  navigation: any
  type: TabType
}

export const MyVideosContent: FC<MyVideosContentProps> = ({ navigation, type }) => {
  const [posts, setPosts] = useState(null)
  const user = useAppSelector((state) => state.auth.user) as AuthUser
  const userId = user ? user.user_id : -1
  const url = type === TabType.MyVideos ? `/user/video/${userId}` : `/user/video/liked/${userId}`

  const fetchData = async () => {
    const response = await axiosInstance.getAxios().get(url)
    if (response.status === 200 && response.data) {
      setPosts(response.data.videos)
      console.log('MyVideosContent fetchData', posts.length)
    }
  }

  useEffect(() => {
    console.log('MyVideosContent useEffect')
    fetchData()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={({ item, index }) =>
          index < posts.length - (posts.length % 2) && <VideoItem video={item} navigation={navigation} />
        }
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={4}
        maxToRenderPerBatch={5}
        numColumns={3}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  )
}
