import React, { useRef, useState } from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { PostSingle } from './Post'
import { colors } from 'theme'
import { Post } from 'libs/types'
import useMaterialNavbarHeight from 'libs/hooks/useMaterialNavbarHeight'

const posts: Post[] = [
  {
    id: '1',
    creator: 'usr1',
    media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'],
    description: 'desc1',
    likesCount: 1,
    commentsCount: 1,
    sharesCount: 1,
    creation: '1',
    hashtags: ['hashtag1', 'hashtag2'],
    musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
  },
  {
    id: '2',
    creator: 'usr2',
    media: ['http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'],
    description: 'desc2',
    likesCount: 2,
    commentsCount: 2,
    sharesCount: 2,
    creation: '2',
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
    creation: '3',
    hashtags: ['hashtag1', 'hashtag2'],
    musicThumbnail: 'https://reactnative.dev/img/tiny_logo.png'
  }
]

interface FeedProps {
  creator: string
  profile: boolean // boolean to check if the user is viewing other user's profile
  currentTab: string
}

export const Feed = ({ creator, profile, currentTab }: FeedProps) => {
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState<number>(0)
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].index)
    }
  }

  // useEffect(() => {
  //   if (profile && creator) {
  //     // fetch user's posts
  //   } else {
  //     // fetch for you posts
  //   }
  // }, []);

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])
  const feedItemHeight = Dimensions.get('window').height - useMaterialNavbarHeight(profile)
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ height: feedItemHeight, backgroundColor: colors.palette.neutral900 }}>
        <PostSingle item={item} shouldPlay={index === currentViewableItemIndex} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        windowSize={4}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate={'fast'}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  )
}
