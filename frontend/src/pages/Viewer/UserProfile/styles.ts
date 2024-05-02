import { colors } from 'theme'
import { StyleSheet } from 'react-native'
import { commonUserStyles } from 'components'

export const styles = StyleSheet.create({
  scrollViewContent: {
    backgroundColor: colors.background
  },
  ...commonUserStyles,
  container: {
    ...commonUserStyles.container,
    paddingHorizontal: 10
    // paddingTop: spacing.md, // Add padding to ensure space from top
  },

  followButtonStyle: {
    backgroundColor: colors.followButton,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 2,
    borderWidth: 1.5,
    marginHorizontal: 5,
    borderColor: colors.followButton
  },
  followedButtonStyle: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 2,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: colors.border
  },
  followButtonText: {
    fontSize: 18,
    color: colors.white
  },
  followedButtonText: {
    fontSize: 18,
    color: colors.text
  },
  bioContainer: {
    paddingHorizontal: 50,
    alignItems: 'center',
    marginBottom: 20
  },
  bioText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center'
  }
})
