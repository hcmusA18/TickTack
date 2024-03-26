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
      id: '1',
      creator: 'usr1',
      media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'],
      description: 'desc1',
      likesCount: 1,
      commentsCount: 1,
      sharesCount: 1,
      creation: '11/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      id: '2',
      creator: 'usr2',
      media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      likesCount: 2,
      commentsCount: 2,
      sharesCount: 2,
      creation: '16/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      id: '3',
      creator: 'usr3',
      media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'],
      description: 'desc3',
      likesCount: 3,
      commentsCount: 3,
      sharesCount: 3,
      creation: '15/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      id: '4',
      creator: 'usr4',
      media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'],
      description: 'desc4',
      likesCount: 4,
      commentsCount: 4,
      sharesCount: 4,
      creation: '14/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      id: '5',
      creator: 'usr5',
      media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'],
      description: 'desc5',
      likesCount: 5,
      commentsCount: 5,
      sharesCount: 5,
      creation: '11/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      id: '6',
      creator: 'usr6',
      media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      likesCount: 6,
      commentsCount: 6,
      sharesCount: 6,
      creation: '12/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
    },
    {
      id: '7',
      creator: 'usr7',
      media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'],
      description: 'desc7',
      likesCount: 7,
      commentsCount: 7,
      sharesCount: 7,
      creation: '13/11/2021',
      hashtags: ['hashtag1', 'hashtag2'],
      musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
    }
  ]
  const groups = ['All', 'Watched', 'Unwatched']
  const [selectedGroup, setSelectedGroup] = useState('All')
  return (
    <View style={{ flex: 1 }}>
      {top && (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10, gap: 10 }}>
          {groups.map((group, index) => (
            <TouchableOpacity
              key={index}
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
