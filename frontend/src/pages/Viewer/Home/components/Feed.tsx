import React, { useRef, useState, useEffect } from 'react'
import axiosInstance from 'libs/utils/axiosInstance'
import { Dimensions, FlatList, View } from 'react-native'
import { PostMemo } from './Post'
import { colors } from 'theme'
import useMaterialNavbarHeight from 'libs/hooks/useMaterialNavbarHeight'
import { useIsFocused } from '@react-navigation/native'
import { useAppSelector } from 'libs/redux'

interface FeedProps {
  creator: string
  profile: boolean // boolean to check if the user is viewing other user's profile
  currentTab: string
}

export const Feed = ({ creator, profile, currentTab }: FeedProps) => {
  const [videoIds, setVideoIds] = useState<string[]>([])
  const screenIsFocused = useIsFocused()
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState<number>(0)
  const userId = useAppSelector((state) => state.auth.authUser)

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].index)
    }
  }

  useEffect(() => {
    if (currentTab === 'For You') {
      axiosInstance
        .getAxios()
        .get(`/video/recommend/${userId}?number=100`)
        .then((res) => {
          setVideoIds(res.data.data)
        })
        .catch((error) => {
          const _error = error as Error
          console.error('Error fetching recommended videos:', error.message)
          // get random videos if recommendation fails
          axiosInstance
            .getAxios()
            .get(`/video/random/100`)
            .then((res) => {
              setVideoIds(res.data)
            })
            .catch((error) => {
              const _error = error as Error
              console.error('Error fetching random videos:', error.message)
            })
        })
    }
  }, [currentTab, userId])

  useEffect(() => {
    if (!screenIsFocused) {
      setCurrentViewableItemIndex(-1)
    }
  }, [screenIsFocused])

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])
  const feedItemHeight = Dimensions.get('window').height - useMaterialNavbarHeight(profile)

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ height: feedItemHeight, backgroundColor: colors.black }}>
        <PostMemo videoId={item} shouldPlay={index === currentViewableItemIndex} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={videoIds}
        windowSize={4}
        initialNumToRender={2}
        maxToRenderPerBatch={4}
        removeClippedSubviews
        renderItem={renderItem}
        keyExtractor={(item) => item}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate={'fast'}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  )
}
