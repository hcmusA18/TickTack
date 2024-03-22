import React, { useState } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import { Icon } from 'react-native-paper'
import InterestButton from './InterestButton' // Assuming InterestButton is in the same directory
import { colors } from 'theme'

interface InterestGroupProps {
  categoryName?: string
  categoryIcon?: string
  interests?: string[]
  iconStyle?: any
}

// InterestGroup component
const InterestGroup: React.FC<InterestGroupProps> = (props: InterestGroupProps) => {
  const { categoryName, categoryIcon, interests, iconStyle } = props
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const handleSelect = (interest: string) => {
    const newSelectedInterests = [...selectedInterests]

    // Toggle interest selection
    if (newSelectedInterests.includes(interest)) {
      newSelectedInterests.splice(newSelectedInterests.indexOf(interest), 1)
    } else {
      newSelectedInterests.push(interest)
    }

    setSelectedInterests(newSelectedInterests)
  }

  const renderItem = ({ item }: { item: string }) => (
    <InterestButton title={item} isSelected={selectedInterests.includes(item)} onPress={() => handleSelect(item)} />
  )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={[styles.iconStyleDefaut, iconStyle]}>
          {categoryIcon && <Icon source={categoryIcon} size={24} color={colors.ttt.ink200} />}
        </View>
        <Text style={styles.titleText}>{categoryName}</Text>
      </View>
      <FlatList
        horizontal={false}
        numColumns={5}
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
  iconStyleDefaut: {}
})

export default InterestGroup
