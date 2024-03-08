import React, { useRef, useState } from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { PostSingle } from './Post'
import { colors } from 'theme'
import { VideoBottom } from './VideoBottom'
import { ActionButtons } from './ActionButtons'

const videos = [
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
]
export const Feed = () => {
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState<number>(0)
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].index)
    }
  }

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          { flex: 1, height: Dimensions.get('window').height, position: 'relative' },
          { backgroundColor: colors.background }
        ]}>
        <PostSingle item={item} shouldPlay={index === currentViewableItemIndex} />
        <VideoBottom username={'username'} videoPost={'videoPost'} hashtags={['hashtag1', 'hashtag2']} />
        <ActionButtons
          loveCount={100}
          commentCount={100}
          saveCount={100}
          shareCount={100}
          musicThumbnail={'https://reactnative.dev/img/tiny_logo.png'}
        />
      </View>
    )
  }

  return (
    <View style={{ position: 'relative' }}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  )
}
