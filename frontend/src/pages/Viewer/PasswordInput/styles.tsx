import { StyleSheet } from 'react-native'
import { colors } from '../Login/components/MyColors'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.pjWhite
  },
  scrollView: {
    paddingHorizontal: '5%',
    paddingTop: 24
  },
  warningText: {
    color: colors.palette.UIRed,
    fontSize: 12,
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomColor: colors.palette.ink100,
    borderBottomWidth: 1,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 6
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginBottom: 6
  },
  invalidInput: {
    borderColor: colors.palette.UIRed
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16
  },
  linkText: {
    color: colors.palette.ink300,
    fontWeight: 'bold'
  },
  nextButton: {
    backgroundColor: colors.palette.UIRed,
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16
  },
  nextButtonText: {
    color: colors.palette.pjWhite,
    fontSize: 16,
    fontWeight: '600'
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: '5%'
  },
  tabText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.palette.pjBlack
  }
})
