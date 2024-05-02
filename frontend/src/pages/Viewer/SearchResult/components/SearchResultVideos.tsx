import React, { FC, useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { VideoItem } from './VideoItem'
import { colors } from 'theme'
import axiosInstance from 'libs/utils/axiosInstance'
import Toast from 'react-native-simple-toast'

interface SearchResultVideosProps {
  searchQuery: string
  top: boolean
  navigation: any
}
export const SearchResultVideos: FC<SearchResultVideosProps> = ({ searchQuery, top, navigation }) => {
  const [posts, setPosts] = useState([])

  const searchPosts = async () => {
    try {
      const reponse = await axiosInstance.getAxios().get(`/video/search/${searchQuery}?getFull=true`)

      if (reponse.status !== 200) {
        Toast.show(reponse.data.message, Toast.LONG)
        return
      }
      setPosts(reponse.data.videos)
    } catch (error) {
      console.error('Error fetching posts:', error)
      Toast.show('Error fetching posts', Toast.LONG)
    }
  }

  useEffect(() => {
    searchPosts()
  }, [searchQuery])

  const groups = ['All', 'Watched', 'Unwatched']
  const [selectedGroup, setSelectedGroup] = useState('All')
  return (
    <View style={{ flex: 1 }}>
      {top && (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10, gap: 10 }}>
          {groups.map((group, _) => (
            <TouchableOpacity
              key={group.toLowerCase()}
              style={{ padding: 8, backgroundColor: colors.palette.neutral300, borderRadius: 4 }}
              onPress={() => setSelectedGroup(group)}>
              <Text
                style={{
                  color: selectedGroup === group ? colors.palette.neutral900 : colors.palette.neutral600,
                  fontWeight: 'bold'
                }}>
                {group}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
