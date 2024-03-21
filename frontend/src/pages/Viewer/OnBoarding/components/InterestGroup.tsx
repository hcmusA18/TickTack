import React, { useState } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import { Icon } from 'react-native-paper'
import InterestButton from './InterestButton' // Assuming InterestButton is in the same directory
import { colors } from 'theme'

// Sample interests data
const interests = [
  { key: 'Trends' },
  { key: 'TV shows' },
  { key: 'Marvel' },
  { key: 'Con' },
  { key: 'BTS' },
  { key: 'HBO' },
  { key: 'Naruto' }
]

const InterestGroup = (props) => {
  const [selectedInterest, setSelectedInterest] = useState(null)
  const { title } = props
  const handleSelect = (interest) => {
    setSelectedInterest(interest)
  }

  const renderItem = ({ item }) => (
    <InterestButton
      title={item.key}
      isSelected={selectedInterest === item.key}
      onSelect={() => handleSelect(item.key)}
    />
  )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.iconStyle}>
          <Icon source="ticket-confirmation-outline" size={24} color={colors.ttt.ink200} />
        </View>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      <FlatList
        horizontal={true}
        data={interests}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.interestContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
    // Add other styling as needed
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 21
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  interestContainer: {
    paddingHorizontal: 10
    // Add other styling as needed
  },
  iconStyle: {
    transform: [{ rotate: '-45deg' }]
  }
  // You may want to adjust or add styles for the FlatList or the items within it
})

export default InterestGroup
