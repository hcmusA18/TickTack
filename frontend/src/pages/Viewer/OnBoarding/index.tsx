import React, { FC, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppStackScreenProps } from 'navigators'
import { colors } from 'theme'
import InterestGroup from './components/InterestGroup'

interface OnboardingPageProps extends AppStackScreenProps<'OnboardingPage'> {}

export const OnboardingPage: FC<OnboardingPageProps> = (props) => {
  const navigation = props.navigation

  const getInterests = () => {
    // TODO: get interests from the server

    const result = [
      {
        interestGroup: 'Entertainment & Culture',
        interestIcon: 'ticket-outline',
        iconStyle: {
          transform: [{ rotate: '-45deg' }]
        },
        interests: ['Trends', 'TV Shows', 'Marvel', 'Music', 'Movies', 'Books', 'BTS', 'HBO', 'Naruto']
      },
      {
        interestGroup: 'Home & Family',
        interestIcon: 'home',
        iconStyle: {},
        interests: [
          'Parenting',
          'Motherhood',
          'Weddings',
          'Home Decor',
          'Gardening',
          'DIY',
          'Cooking',
          'Pets',
          'Travel'
        ]
      },
      {
        interestGroup: 'Fashion & Beauty',
        interestIcon: 'bag-checked',
        iconStyle: {},
        interests: ['Make up', 'Nails', 'Snearkers', 'Streetwear', 'Luxury', 'Skincare', 'Hair', 'Fashion', 'Beauty']
      }
    ]

    return result
  }

  // the next status
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const handlingSkip = () => {
    navigation.navigate('Welcome')
  }
  const handlingNext = () => {
    if (isSelected) {
      navigation.navigate('Welcome')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Top */}
        <View style={styles.TopBarContainer}>
          <TouchableOpacity style={styles.buttonSkip} onPress={handlingSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.ContentContainer}>
          <ScrollView contentContainerStyle={styles.interestsContainer}>
            {/* The group of interest */}

            {getInterests().map((group, index) => (
              <InterestGroup
                key={index} // Assuming group has an 'id' property
                categoryName={group.interestGroup}
                categoryIcon={group.interestIcon}
                interests={group.interests}
                iconStyle={group.iconStyle}
              />
            ))}
          </ScrollView>
        </View>

        {/* Bottom */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.nextButton, isSelected && styles.selectedNextButton]} onPress={handlingNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  TopBarContainer: {
    flex: 1,
    backgroundColor: colors.ttt.pjWhite,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    maxHeight: 50
  },
  buttonSkip: {
    justifyContent: 'center',
    marginRight: '5%'
  },
  skipText: {
    fontSize: 15,
    color: colors.ttt.ink200,
    textAlign: 'center'
  },
  // Content
  ContentContainer: {
    flex: 8,
    backgroundColor: colors.ttt.pjWhite
  },
  interestsContainer: {
    flexWrap: 'wrap',
    padding: 16
  },
  // Bottom
  bottomContainer: {
    flex: 1,
    backgroundColor: colors.ttt.pjWhite
  },
  nextButton: {
    width: '90%',
    marginTop: 8,
    marginHorizontal: '5%',
    backgroundColor: colors.ttt.UIGrey,
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24
  },
  selectedNextButton: {
    backgroundColor: colors.ttt.UIRed
  },
  nextButtonText: {
    color: colors.ttt.ink100,
    fontSize: 16,
    fontWeight: '600'
  }
})

export default OnboardingPage
