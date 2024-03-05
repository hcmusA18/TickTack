import React, { useRef } from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { PostSingle } from './Post'
import { colors } from 'theme'
import { VideoBottom } from './VideoBottom'
import { ActionButtons } from './ActionButtons'

export const Feed = () => {
  const array = Array.from({ length: 10 }, (_, i) => i + 1)
  const mediaRefs = useRef([])
  const flatListRef = useRef(null)
  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((item) => {
      const cell = mediaRefs.current[item.key]
      if (cell) {
        console.log('onViewableItemsChanged', item, item.isViewable)
        if (item.isViewable) {
          cell.play()
        } else {
          cell.stop()
        }
      }
    })
  })

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          { flex: 1, height: Dimensions.get('window').height, position: 'relative' },
          { backgroundColor: colors.background }
        ]}>
        <PostSingle ref={(ref) => (mediaRefs.current[index] = ref)} />
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
        ref={flatListRef}
        data={array}
        windowSize={4}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        snapToAlignment={'start'}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        pagingEnabled
        decelerationRate={'normal'}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  )
}
