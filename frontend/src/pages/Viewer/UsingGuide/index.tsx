import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppStackScreenProps } from 'navigators'
import { colors } from 'theme'

interface UsingGuideProps extends AppStackScreenProps<'UsingGuide'> {}

export const UsingGuide: React.FC<UsingGuideProps> = (props) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.ttt.pjWhite }}>
      <View style={{ flex: 1 }}>
        {/* Top */}
        <View style={styles.TopBarContainer}>
          <TouchableOpacity
            style={styles.buttonSkip}
            onPress={() => {
              return
            }}>
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
        </View>

        {/* Bottom */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={[styles.nextButton, isSelected && styles.selectedNextButton]}>
            <Text style={[styles.nextButtonText, isSelected && styles.NextBtnPressedText]}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  },
  NextBtnPressedText: {
    color: colors.ttt.pjWhite
  }
})
