import { AppStackScreenProps } from 'navigators'
import React, { FC, useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from 'theme'
import { styles } from '../UsingGuide'
import InterestGroup from './components/InterestGroup'

interface OnboardingPageProps extends AppStackScreenProps<'OnboardingPage'> {}

export const OnboardingPage: FC<OnboardingPageProps> = (props) => {
  const navigation = props.navigation

  const getInterests = () => {
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

  // State to track isSelected status for each child
  const [isSelectedMap, setIsSelectedMap] = useState<Map<number, boolean>>(new Map())

  // Function to update isSelected state for a child component
  const handleSelect = (childIndex: number, status: boolean) => {
    setIsSelectedMap((prevMap) => new Map(prevMap.set(childIndex, status)))
  }

  // Function to check if all child components have no selected choices
  const updateParentSelectedStatus = () => {
    const allChildrenHaveNoSelectedChoices = Array.from(isSelectedMap.values()).every((status) => status === false)
    setIsSelected(!allChildrenHaveNoSelectedChoices)
  }

  useEffect(() => {
    updateParentSelectedStatus()
  }, [isSelectedMap])

  const handlingSkip = () => {
    navigation.navigate('UsingGuide')
  }
  const handlingNext = () => {
    if (isSelected) {
      navigation.navigate('UsingGuide')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.ttt.pjWhite }}>
      <View style={{ flex: 1 }}>
        {/* Top */}
        <View style={styles.TopBarContainer}>
          <TouchableOpacity style={styles.buttonSkip} onPress={handlingSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.ContentContainer}>
          <Text style={styles.headerText}>Choose your{'\n'}intersts</Text>
          <Text style={styles.detailText}>Personalize your experience by picking 3 or more topics</Text>
          <FlatList
            data={getInterests()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <InterestGroup
                index={index}
                categoryName={item.interestGroup}
                categoryIcon={item.interestIcon}
                interests={item.interests}
                iconStyle={item.iconStyle}
                handleSelectGroup={handleSelect}
              />
            )}
          />
        </View>

        {/* Bottom */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.nextButton, isSelected && styles.selectedNextButton]} onPress={handlingNext}>
            <Text style={[styles.nextButtonText, isSelected && styles.NextBtnPressedText]}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default OnboardingPage
