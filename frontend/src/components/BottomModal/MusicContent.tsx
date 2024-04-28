import { Feather } from '@expo/vector-icons'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { clearModal } from 'libs/redux/sliceModal'
import { setMusicId } from 'libs/redux/sliceVideoPost'
import { Sound } from 'libs/types'
import DATA from 'pages/Viewer/VideoPreviewer/SoundRawData'
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
  const musicId = useAppSelector((state) => state.videoPost.musicId)
  const [sound, _] = useState(DATA.find((item) => item.id === musicId)?.name || null)
  console.log('sound', sound)
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
              <TouchableOpacity onPress={() => dispatch(setMusicId(item.id))}>
                <SoundItem item={item} sound={sound} />
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  )
}
