import { Feather } from '@expo/vector-icons'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { clearModal } from 'libs/redux/sliceModal'
import { setMusic } from 'libs/redux/sliceVideoPost'
import { Sound } from 'libs/types'
import React, { FC, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from 'theme'
import { SoundItem } from './SoundItem'

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: colors.palette.primary100,
    borderRadius: 10,
    padding: 20,
    flex: 1
  }
})

interface MusicContentProps {
  sounds: Sound[]
}

export const MusicContent: FC<MusicContentProps> = ({ sounds }) => {
  const dispatch = useAppDispatch()
  const music = useAppSelector((state) => state.videoPost.music)
  const [sound, setSound] = useState(sounds.find((item) => item.music_id === music?.music_id)?.music_name || null)

  return (
    <View style={{ backgroundColor: colors.white, padding: 16, height: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          paddingBottom: 10,
          paddingTop: 0,
          backgroundColor: colors.white
        }}>
        <View></View>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Select your favorite sound</Text>
        <TouchableOpacity onPress={() => dispatch(clearModal())}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.modalContent}>
        <BottomSheetFlatList
          data={sounds}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setMusic(item))
                  setSound(item.music_name)
                }}>
                <SoundItem item={item} sound={sound} />
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item) => item.music_id}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  )
}
