import React, { FC } from 'react'
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { colors, typography } from 'theme'
interface CategoryBarProps {
  categories: string[]
  currentTab: number
  setCurrentTab: (index: number) => void
}

const styles = StyleSheet.create({
  categoryBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    marginHorizontal: 10
  },
  tabBarText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: typography.primary.normal,
    fontSize: 18,
    color: colors.palette.neutral900
  },
  tabBarTextSelected: {
    fontFamily: typography.primary.bold,
    fontSize: 18
  },
  tabBarIndicator: {
    borderRadius: 2,
    height: 3,
    width: '100%',
    backgroundColor: colors.palette.neutral900,
    position: 'absolute',
    bottom: -5
  }
})

export const CategoryBar: FC<CategoryBarProps> = ({ categories, currentTab, setCurrentTab }) => {
  return (
    <View style={styles.categoryBarContainer}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setCurrentTab(index)}
          style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
          <Animated.Text style={[styles.tabBarText, currentTab === index ? styles.tabBarTextSelected : {}]}>
            {category}
          </Animated.Text>
          {currentTab === index && <View style={styles.tabBarIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  )
}
