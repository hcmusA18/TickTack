import React, { FC } from 'react'
import { FlatList, Modal, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from 'theme'
import { Item } from './SoundItem'
import DATA from '../SoundRawData'

interface MusicModalNativeProps {
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
    backgroundColor: colors.palette.neutral100,
    borderRadius: 10,
    padding: 20,
    height: '90%'
  }
})

export const MusicModalNative: FC<MusicModalNativeProps> = (props) => {
  const { visible, setVisible, sound, setSound } = props
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      style={{ height: '50%', backgroundColor: colors.palette.neutral900 }}
      onRequestClose={() => setVisible(false)}>
      <View style={styles.modalViewContainer}>
        <View style={styles.modalContainer}>
          <View
            style={{
              flex: 1,
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
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSound(item.name)}>
                  <Item item={item} sound={sound} setSound={setSound} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}
