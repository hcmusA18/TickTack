import { StyleSheet } from 'react-native'
import { colors } from 'theme'

export const styles = StyleSheet.create({
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
    marginBottom: 24,
    height: '60%',
    alignContent: 'center',
    justifyContent: 'center'
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
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center', // This centers the child vertically in the container
    alignItems: 'center' // This centers the child horizontally in the container
  },
  image: {
    resizeMode: 'cover', // Cover the entire area without stretching
    borderRadius: 18, // Adjust the border radius as needed
    borderWidth: 10,
    borderColor: colors.ttt.pjBlack
  },
  fingerTip: {
    width: 70, // Set the width of the finger tip image
    height: 70, // Set the height of the finger tip image
    resizeMode: 'contain'
  }
})
