import { AppStackScreenProps } from 'navigators'
import React, { useEffect, useState } from 'react'
import { Animated, Dimensions, Easing, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from 'theme'
import { styles } from './styles'

interface UsingGuideProps extends AppStackScreenProps<'UsingGuide'> {}

export const UsingGuide: React.FC<UsingGuideProps> = (props: UsingGuideProps) => {
  const { navigation } = props
  // Use `require` to properly import the image asset
  const imagePath = require('../../../assets/images/thomas-vimare-IZ01rjX0XQA-unsplash.jpg')
  const fingerTipPath = require('../../../assets/icons/tap_11242943.png')

  // Here we assume that you want the image to take up the whole screen.
  // Adjust the width and height as needed for your use case.
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height
  const widthValue = 0.6 * windowWidth
  const heightValue = (windowHeight / windowWidth) * widthValue

  const fingerTipAnim = new Animated.Value(0) // Initial value for finger tip's vertical position

  useEffect(() => {
    // Loop the up and down movement
    Animated.loop(
      Animated.sequence([
        Animated.timing(fingerTipAnim, {
          toValue: 0, // Move finger tip down
          duration: 1000,
          easing: Easing.inOut(Easing.quad), // This will apply an ease in-out effect
          useNativeDriver: true
        }),
        Animated.timing(fingerTipAnim, {
          toValue: -200, // Move finger tip up
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start()
  }, [])

  const [showNextButton, setShowNextButton] = useState(false) // Initially the button is not visible

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNextButton(true) // This will trigger the button to become visible after 5000ms (5 seconds)
    }, 3000)

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer)
  }, []) // Empty dependency array ensures this effect runs only once after the initial render

  const handleNextPress = () => {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.ttt.pjWhite }}>
      <View style={{ flex: 1 }}>
        {/* Top */}
        <View style={styles.TopBarContainer}>
          <TouchableOpacity style={styles.buttonSkip}>
            <Text style={styles.skipText}></Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.ContentContainer}>
          <View>
            <Text style={styles.headerText}>Swipe up</Text>
            <Text style={styles.detailText}>
              Videos are personalized for you based on what you watch, like, and share.
            </Text>
          </View>
          <View style={styles.imgContainer}>
            <Image
              source={imagePath}
              style={[styles.image, { width: widthValue, height: heightValue }]}
              resizeMode="cover" // or "contain", "stretch", "center", etc. based on your need
            />
            {/* Animated finger tip image */}
            <Animated.Image
              source={fingerTipPath} // Replace with your finger tip image path
              style={[
                styles.fingerTip,
                {
                  // Add the animated style
                  transform: [{ translateY: fingerTipAnim }],
                  // Position it at the bottom right
                  position: 'absolute',
                  right: 100,
                  bottom: 100
                }
              ]}
            />
          </View>
        </View>

        {/* Bottom */}
        <View style={styles.bottomContainer}>
          {showNextButton && (
            <TouchableOpacity style={[styles.nextButton, styles.selectedNextButton]} onPress={handleNextPress}>
              <Text style={[styles.nextButtonText, styles.NextBtnPressedText]}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}
