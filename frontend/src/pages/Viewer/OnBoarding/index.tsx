import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
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
      <View style={styles.container}>
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
    color: colors.ttt.ink100,
    textAlign: 'center'
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 8
  },
  detailText: {
    fontSize: 21,
    color: colors.ttt.ink200,
    marginVertical: 8
  },
  // Content
  ContentContainer: {
    flex: 8,
    backgroundColor: colors.ttt.pjWhite,
    width: '90%',
    marginHorizontal: '5%'
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    height: '65%'
  },
  selectedNextButton: {
    backgroundColor: colors.ttt.UIRed
  },
  nextButtonText: {
    color: colors.ttt.ink100,
    fontSize: 16,
    fontWeight: '600'
  },
  NextBtnPressedText: {
    color: colors.ttt.pjWhite
  }
})

export default OnboardingPage
