import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { colors } from 'theme'

export const DurationSelector = ({ durationOptions, selectedDuration, onDurationSelect }) => {
  const scrollViewRef = useRef(null)
  const [scrollX] = useState(new Animated.Value(0))

  // useEffect(() => {
  //   const durationIndex = durationOptions.indexOf(selectedDuration)
  //   const scrollPosition = durationIndex * 80

  //   scrollViewRef.current.scrollTo({
  //     x: scrollPosition,
  //     animated: true
  //   })
  // }, [selectedDuration])

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        snapToInterval={80}
        decelerationRate="fast"
        scrollEventThrottle={16}
        ref={scrollViewRef}
        contentContainerStyle={styles.durationContainer}>
        {durationOptions.map((duration: number, _) => (
          <TouchableOpacity
            key={duration.toString()}
            style={[styles.durationOption, duration === selectedDuration && styles.selectedDurationOption]}
            onPress={() => onDurationSelect(duration)}>
            {duration === selectedDuration ? (
              <Text>{`${duration}s`}</Text>
            ) : (
              <Text style={{ color: colors.palette.neutral400 }}>{`${duration}s`}</Text>
            )}
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  durationOption: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.palette.neutral400
  },
  selectedDurationOption: {
    backgroundColor: colors.palette.neutral400
  }
})
