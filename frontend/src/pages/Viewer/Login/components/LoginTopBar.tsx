import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'

interface TopBarProps {
  firstIcon: string
  secondIcon: string
  textContent?: string // Make textContent optional
  onFirstIconPress: () => void
  onSecondIconPress: () => void
}

export const TopBar: FC<TopBarProps> = ({
  firstIcon,
  secondIcon,
  textContent,
  onFirstIconPress,
  onSecondIconPress
}) => {
  return (
    <View style={styles.topBar}>
      <IconButton icon={firstIcon} size={28} onPress={onFirstIconPress} />
      {/* Conditional rendering for the title */}
      {textContent && <Text style={styles.topBarTitle}>{textContent}</Text>}
      <IconButton icon={secondIcon} size={28} onPress={onSecondIconPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10 // Added padding for visual comfort
  },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold' // Added fontWeight for visual comfort
  }
  // Add other styles as needed
})

export default TopBar
