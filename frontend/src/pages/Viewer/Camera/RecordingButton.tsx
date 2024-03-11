import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { Circle, Svg } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const radius = 45
const circumference = radius * Math.PI * 2

const ProgressCircle = ({ duration }) => {
  const strokeOffset = useSharedValue(circumference)

  const percentage = useDerivedValue(() => {
    const number = ((circumference - strokeOffset.value) / circumference) * 100
    return withTiming(number, { duration })
  })

  const strokeColor = useDerivedValue(() => {
    return interpolateColor(percentage.value, [0, 50, 100], ['#FF0000', '#FF5733', '#FFC300'])
  })

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration }),
      stroke: strokeColor.value
    }
  })

  useEffect(() => {
    strokeOffset.value = 0
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Svg height={radius * 2} width={radius * 2} viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" stroke="#E7E7E7" strokeWidth="10" fill="transparent" />
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={`${radius * Math.PI * 2}`}
          strokeWidth="10"
          fill="transparent"
        />
      </Svg>
    </View>
  )
}

export default ProgressCircle
