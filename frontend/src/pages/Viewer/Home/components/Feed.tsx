import React, { useRef, useState, useEffect } from 'react'
import { Dimensions, FlatList, View } from 'react-native'
import { PostSingle } from './Post'
import { colors } from 'theme'
import { Post } from 'libs/types'
import axios from 'axios'
import useMaterialNavbarHeight from 'libs/hooks/useMaterialNavbarHeight'
import { useIsFocused } from '@react-navigation/native'

const videoIds = Array.from({ length: 100 }, (_, i) => `${i + 1}`)

interface FeedProps {
  creator: string
  profile: boolean // boolean to check if the user is viewing other user's profile
  currentTab: string
}

export const Feed = ({ creator, profile, currentTab }: FeedProps) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [remaining, setRemaining] = useState<number>(0)
  const screenIsFocused = useIsFocused()
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState<number>(0)
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }
  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      console.log(viewableItems[0].index)
      setCurrentViewableItemIndex(viewableItems[0].index)
    }
  }
  useEffect(() => {
    if (!screenIsFocused) {
      setCurrentViewableItemIndex(-1)
    }
  }, [screenIsFocused])

  const fetchAndSetPost = (videoId) => {
    axios.get(`https://6030-113-172-122-34.ngrok-free.app/recsys/video/${videoId}`).then((res) => {
      setPosts((prev) => [...prev, res.data])
    })
    setRemaining((prev) => prev + 1)
  }

  useEffect(() => {
    if (profile && creator) {
      // fetch user's posts
    } else if (remaining <= 2) {
      videoIds.forEach((videoId) => fetchAndSetPost(videoId))
    }
  }, [creator, profile, remaining])

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
