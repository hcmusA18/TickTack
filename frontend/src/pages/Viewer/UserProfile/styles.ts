import { StyleSheet } from 'react-native'
import { colors } from 'theme'

export const styles = StyleSheet.create({
  scrollViewContent: {
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 10
    // paddingTop: spacing.md, // Add padding to ensure space from top
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // paddingVertical: 10,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 40
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.black
  },
  tabIcon: {
    color: colors.palette.neutral500
  },
  activeIcon: {
    color: colors.text
  },
  headerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 40
  },

  username: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },

  countContainer: {
    flexDirection: 'row',
    // justifyContent: "space-between",
    // width: "80%",
    marginTop: 15
  },

  countItemContainer: {
    flex: 1,
    alignItems: 'center'
  },

  countNumberContainer: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  countTextContainer: {
    fontSize: 16,
    color: colors.text
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },

  buttonStyle: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: colors.border
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
