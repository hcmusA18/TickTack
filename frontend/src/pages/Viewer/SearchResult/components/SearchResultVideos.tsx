import { Post } from 'libs/types'
import React, { FC, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { VideoItem } from './VideoItem'
import { colors } from 'theme'

interface SearchResultVideosProps {
  searchQuery: string
  top: boolean
  navigation: any
}
export const SearchResultVideos: FC<SearchResultVideosProps> = ({ searchQuery, top, navigation }) => {
  const posts: Post[] = [
    {
      video_id: '1',
      user_id: 'usr1',
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      text: 'desc1',
      likes_count: 1,
      comments_count: 1,
      shares_count: 1,
      create_time: '11/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      music_thumbnail: 'https://reactnative.dev/img/tiny_logo.png',
      duration: 60,
      music_id: 'music1',
      privacy: 'public',
      view_count: 1
    },
    {
      video_id: '2',
      user_id: 'usr2',
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim video_ est laborum',
      likes_count: 2,
      comments_count: 2,
      shares_count: 2,
      create_time: '16/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      music_thumbnail: 'https://reactnative.dev/img/tiny_logo.png',
      duration: 60,
      music_id: 'music2',
      privacy: 'public',
      view_count: 1
    },
    {
      video_id: '3',
      user_id: 'usr3',
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      text: 'desc3',
      likes_count: 3,
      comments_count: 3,
      shares_count: 3,
      create_time: '15/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      music_thumbnail: 'https://reactnative.dev/img/tiny_logo.png',
      duration: 60,
      music_id: 'music3',
      privacy: 'public',
      view_count: 1
    },
    {
      video_id: '4',
      user_id: 'usr4',
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      text: 'desc4',
      likes_count: 4,
      comments_count: 4,
      shares_count: 4,
      create_time: '14/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      music_thumbnail: 'https://reactnative.dev/img/tiny_logo.png',
      duration: 60,
      music_id: 'music4',
      privacy: 'public',
      view_count: 1
    },
    {
      video_id: '5',
      user_id: 'usr5',
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      text: 'desc5',
      likes_count: 5,
      comments_count: 5,
      shares_count: 5,
      create_time: '11/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      music_thumbnail: 'https://reactnative.dev/img/tiny_logo.png',
      duration: 60,
      music_id: 'music5',
      privacy: 'public',
      view_count: 1
    },
    {
      video_id: '6',
      user_id: 'usr6',
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      likes_count: 6,
      comments_count: 6,
      shares_count: 6,
      create_time: '12/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      music_thumbnail: 'https://reactnative.dev/img/tiny_logo.png',
      duration: 60,
      music_id: 'music6',
      privacy: 'public',
      view_count: 1
    },
    {
      video_id: '7',
      user_id: 'usr7',
      video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      text: 'desc7',
      likes_count: 7,
      comments_count: 7,
      shares_count: 7,
      create_time: '13/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      music_thumbnail: 'https://reactnative.dev/img/tiny_logo.png',
      duration: 60,
      music_id: 'music7',
      privacy: 'public',
      view_count: 1
    }
  ]
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
