import React, { useRef, useState, useEffect, useCallback } from 'react'
import axiosInstance from 'libs/utils/axiosInstance'
import { Dimensions, FlatList, View } from 'react-native'
import { PostMemo } from './Post'
import { colors } from 'theme'
import useMaterialNavbarHeight from 'libs/hooks/useMaterialNavbarHeight'
import { useIsFocused } from '@react-navigation/native'
import { useAppSelector } from 'libs/redux'
import { max } from 'lodash'

interface FeedProps {
  profile: boolean // boolean to check if the user is viewing other user's profile
  creatorPost?: any[] // array of posts if the user is viewing other user's profile
  videoId?: string // video id which is currently pressed
  currentTab?: string
}

export const Feed = ({ profile, creatorPost, videoId, currentTab }: FeedProps) => {
  const [videoIds, setVideoIds] = useState<string[]>([])
  const screenIsFocused = useIsFocused()
  const [currentViewableItemIndex, setCurrentViewableItemIndex] = useState<number>(0)
  const { userId } = useAppSelector((state) => state.auth.user)

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentViewableItemIndex(viewableItems[0].index)
    }
  }

  const fetchVideos = useCallback(
    async (n: number) => {
      try {
        const res = await axiosInstance.getAxios().get(`/video/recommend/${userId}?number=${n}`)
        setVideoIds(res.data.data)
      } catch (error) {
        const _error = error as Error
        console.error('Error fetching recommended videos:', _error.message)
        try {
          const res = await axiosInstance.getAxios().get(`/video/random/${n}`)
          setVideoIds(res.data)
        } catch (error) {
          const _error = error as Error
          console.error('Error fetching random videos:', _error.message)
        }
      }
    },
    [userId]
  )

  useEffect(() => {
    if (currentTab && currentTab === 'For You') {
      fetchVideos(100)
    }
    if (profile) {
      const videoIds = creatorPost.map((post) => post.videoId)
      const firstIndex = max([videoIds.indexOf(videoId), 0])
      const shouldVideoIds = videoIds.slice(firstIndex)
      setCurrentViewableItemIndex(firstIndex)
      setVideoIds(shouldVideoIds)
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
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        removeClippedSubviews
        renderItem={renderItem}
        initialScrollIndex={max([videoIds.indexOf(videoId), 0])}
        keyExtractor={(item) => item}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate={'fast'}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  )
}
