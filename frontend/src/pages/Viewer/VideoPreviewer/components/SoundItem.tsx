import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from 'theme'
import { FontAwesome5 } from '@expo/vector-icons'

type ItemProps = {
  item: { name: string; id: string; artist: string; duration: string }
  sound: string
  setSound: (sound: string) => void
}

export class Item extends PureComponent<ItemProps> {
  render() {
    const { item, sound } = this.props
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
}

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
    fontSize: 18,
    fontWeight: 'bold'
  },
  details: {
    fontSize: 14,
    color: colors.palette.neutral700
  }
})
