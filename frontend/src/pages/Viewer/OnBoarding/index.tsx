import React, { FC, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppStackScreenProps } from 'navigators'
import { colors } from 'theme'
import InterestButton from './components/InterestButton'

interface OnboardingPageProps extends AppStackScreenProps<'OnboardingPage'> {}

export const OnboardingPage: FC<OnboardingPageProps> = (props) => {
  const navigation = props.navigation

  const [isSelected, setIsSelected] = useState<boolean>(false)
  const getGroup = () => {
    return ['Entertainment & Culture', 'Home & Family', 'Fashion & Beauty']
  }
  const getInterest = (group: string) => {
    if (group === 'Entertainment & Culture')
      return ['Trends', 'TV shows', 'Marvel', 'BTS', 'HBO', 'Naruto', 'Motherhood']
    if (group === 'Home & Family')
      return ['Motherhood', 'Parenting', 'Weddings', 'Fatherhood', 'Married life', 'Relationship']
    if (group === 'Fashion & Beauty') return ['Fashion', 'Beauty', 'Makeup', 'Skincare', 'Hair', 'Nails', 'Shoes']
  }

  const groups = getGroup()
  const interests = {}
  for (let group of groups) {
    interests[group] = getInterest(group)
  }

  const handlingSkip = () => {
    navigation.navigate('Welcome')
  }
  const handlingNext = () => {
    navigation.navigate('Welcome')
    // navigation.navigate('Main')
  }

  const [selectedInterests, setSelectedInterests] = useState({})

  // Handle selecting/deselecting interests
  const toggleInterest = (category, interest) => {
    setSelectedInterests((prevSelections) => {
      const updatedSelections = { ...prevSelections }
      updatedSelections[category] = updatedSelections[category] || []

      if (updatedSelections[category].includes(interest)) {
        updatedSelections[category] = updatedSelections[category].filter((i) => i !== interest)
      } else {
        updatedSelections[category].push(interest)
      }

      return updatedSelections
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.TopBarContainer}>
          <TouchableOpacity style={styles.buttonSkip} onPress={handlingSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ContentContainer}>
          <ScrollView contentContainerStyle={styles.interestsContainer}>
            {groups.map((group) => (
              <View key={group}>
                <Text>{group}</Text>
                {interests[group].map((interest) => (
                  <InterestButton
                    key={interest}
                    title={interest}
                    isSelected={selectedInterests[group]?.includes(interest) || false}
                    onSelect={toggleInterest}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
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
    flexDirection: 'row', // change this for your desired layout
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