import { colors } from 'theme'
import { StyleSheet } from 'react-native'

export const commonUserStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background
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
    borderBottomColor: colors.tint
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
    fontSize: 12,
    color: colors.palette.neutral500
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },

  buttonStyle: {
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: colors.border
  }
})
