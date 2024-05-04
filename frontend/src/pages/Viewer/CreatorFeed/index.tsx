import React, { FC, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Screen, Feed } from 'components'
import { AppStackScreenProps } from 'navigators'
import Feather from '@expo/vector-icons/Feather'
import { colors } from 'theme'
import { useAppSelector } from 'libs/redux'

interface CreatorFeedProps extends AppStackScreenProps<'CreatorFeed'> {}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  }
})

const BackBar: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        zIndex: 1000
      }}>
      <Feather name="arrow-left" size={24} color={colors.palette.neutral100} />
      <Text style={{ color: colors.palette.neutral100 }}>Back</Text>
    </TouchableOpacity>
  )
}

export const CreatorFeed: FC<CreatorFeedProps> = ({ navigation, route }) => {
  const { creatorPost, videoId } = route.params
  const authToken = useAppSelector((state) => state.auth.authToken)

  useEffect(() => {
    if (!authToken) {
      navigation.goBack()
    }
  }, [authToken])

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <BackBar navigation={navigation} />
      <Feed creatorPost={creatorPost} videoId={videoId} profile={true} />
    </Screen>
  )
}
