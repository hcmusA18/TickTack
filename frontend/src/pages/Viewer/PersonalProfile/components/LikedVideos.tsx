import React, { FC, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { VideoItem } from '../../SearchResult/components/VideoItem'
import axiosInstance from 'libs/utils/axiosInstance'
import { useAppSelector } from 'libs/redux'
import { AuthUser } from 'libs/types'

const bgColor = 'orange'

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor
  }
})

interface LikedVideosContentProps {
  navigation: any
}

export const LikedVideosContent: FC<LikedVideosContentProps> = ({ navigation }) => {
  const [posts, setPosts] = useState(null)
  const user = useAppSelector((state) => state.auth.user) as AuthUser

  const fetchData = async () => {
    const likeResponse = await axiosInstance.getAxios().get(`/user/video/liked/${user.user_id}`)
    if (likeResponse.status === 200 && likeResponse.data) {
      setPosts(likeResponse.data.videos)
    }
  }

  useEffect(() => {
    fetchData()
  })

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item, index }) =>
          index < posts.length - (posts.length % 2) && <VideoItem video={item} navigation={navigation} />
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
