import React, { useState } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import { Icon } from 'react-native-paper'
import InterestButton from './InterestButton' // Assuming InterestButton is in the same directory
import { colors } from 'theme'

interface InterestGroupProps {
  categoryName?: string
  categoryIcon?: string
  interests?: string[]
}

// InterestGroup component
const InterestGroup: React.FC<InterestGroupProps> = ({ categoryName, categoryIcon, interests }) => {
  const [selectedInterests, setSelectedInterests] = useState<{ [key: string]: boolean }>({})

  const handleSelect = (interestKey: string) => {
    setSelectedInterests((prevState) => ({
      ...prevState,
      [interestKey]: !prevState[interestKey] ?? true
    }))
  }

  const renderItem = ({ item }: { item: string }) => (
    <InterestButton title={item} isSelected={selectedInterests[item]} onPress={() => handleSelect(item)} />
  )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {categoryIcon && <Icon source={categoryIcon} size={24} color={colors.ttt.ink200} style={styles.iconStyle} />}
        <Text style={styles.titleText}>{categoryName}</Text>
      </View>
      <FlatList
        horizontal
        data={interests}
        renderItem={renderItem}
        keyExtractor={(item) => item}
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
})

export default InterestGroup
