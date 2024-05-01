import React, { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { colors } from 'theme'
import { FontAwesome5 } from '@expo/vector-icons'
import { Sound } from 'libs/types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    width: '100%',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 8
  },
  content: {
    marginStart: 15,
    flexDirection: 'column'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  details: {
    fontSize: 14,
    color: colors.palette.neutral700
  }
})

interface MusicItemProps {
  item: Sound
  sound: string
}

export const SoundItem: FC<MusicItemProps> = ({ item, sound }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: sound === item.music_name ? colors.palette.overlay50 : colors.palette.overlay20 }
      ]}>
      <FontAwesome5 name="music" size={19} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.music_name}</Text>
        <Text style={styles.details}>{item.music_author}</Text>
      </View>
    </View>
  )
}
