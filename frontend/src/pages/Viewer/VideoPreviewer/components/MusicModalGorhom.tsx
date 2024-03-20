import React, { FC, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Feather, FontAwesome5 } from '@expo/vector-icons'
import { colors } from 'theme'
import DATA from '../SoundRawData'

interface MusicModalGorhomProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  sound: string
  setSound: (sound: string) => void
}

const styles = StyleSheet.create({
  modalViewContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.palette.overlay20
  },
  modalContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: colors.palette.neutral200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '50%',
    padding: 10
  },
  modalContent: {
    backgroundColor: colors.palette.primary100,
    borderRadius: 10,
    padding: 20,
    flex: 1
  },
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
    fontSize: 18,
    fontWeight: 'bold'
  },
  details: {
    fontSize: 14,
    color: colors.palette.neutral700
  }
})

const MusicItem = ({
  item,
  sound
}: {
  item: { name: string; id: string; artist: string; duration: string }
  sound: string
}) => {
  const containerColor = sound === item.name ? colors.palette.overlay50 : colors.palette.overlay20

  return (
    <View style={[styles.container, { backgroundColor: containerColor }]}>
      <FontAwesome5 name="music" size={19} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.details}>
          {item.artist} - {item.duration}
        </Text>
      </View>
    </View>
  )
}

export const MusicModalGorhom: FC<MusicModalGorhomProps> = (props) => {
  const { visible, setVisible, sound, setSound } = props
  const bottomSheetRef = useRef<BottomSheet>(null)

  useEffect(() => {
    console.log('visible', visible)
    if (visible && bottomSheetRef.current) {
      bottomSheetRef.current.expand()
    } else {
      bottomSheetRef.current?.close()
    }
  }, [visible])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['50%']}
      handleHeight={40}
      backgroundComponent={({ style }) => <View style={[style, styles.modalViewContainer]} />}
      handleComponent={() => (
        <View style={{ backgroundColor: colors.white, alignItems: 'center' }}>
          <View style={{ height: 2, width: 50, backgroundColor: colors.palette.overlay20, borderRadius: 2 }} />
        </View>
      )}
      handleIndicatorStyle={{ backgroundColor: colors.palette.neutral300 }}
      onClose={() => setVisible(false)}>
      <View style={{ backgroundColor: colors.white, padding: 16, height: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            paddingBottom: 10,
            paddingTop: 0
          }}>
          <View></View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Select your favorite sound</Text>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <BottomSheetFlatList
            data={DATA}
            renderItem={({ item }) => {
              console.log('item', item)
              return (
                <TouchableOpacity onPress={() => setSound(item.name)}>
                  <MusicItem item={item} sound={sound} />
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item) => item.id}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </BottomSheet>
  )
}
