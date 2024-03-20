import React, { FC } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Feather } from '@expo/vector-icons'
import { colors } from 'theme'
import { clearModal } from 'libs/redux/sliceModal'
import { useAppDispatch, useAppSelector } from 'libs/redux'
import { setSound } from 'libs/redux/sliceSoundSelect'
import { SoundItem } from './SoundItem'
import { Sound } from 'libs/types'

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
  const sound = useAppSelector((state) => state.soundSelect.sound)
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
              <TouchableOpacity onPress={() => dispatch(setSound(item.name))}>
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
