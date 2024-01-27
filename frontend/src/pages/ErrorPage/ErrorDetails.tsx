import React, { ErrorInfo } from 'react'
import { Text, Button, Icon } from 'react-native-paper'
import { ScrollView, ViewStyle, StyleSheet, View } from 'react-native'
import { colors, spacing } from '../../theme'
import { Screen } from '../../components/Screen'

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset: () => void
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    flex: 1
  },
  topSection: {
    flex: 1,
    alignItems: 'center'
  },
  heading: {
    color: colors.error,
    marginBottom: spacing.md
  },
  errorSection: {
    flex: 2,
    backgroundColor: colors.separator,
    marginVertical: spacing.md,
    borderRadius: 6
  },
  errorSectionContentContainer: {
    padding: spacing.md
  } as ViewStyle,
  errorText: {
    color: colors.error
  },
  errorBacktrace: {
    marginTop: spacing.md,
    color: colors.textDim
  },
  resetButton: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.xxl
  }
})
export const ErrorDetails = (props: ErrorDetailsProps) => {
  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <View style={styles.topSection}>
        <Icon source="alert-circle-outline" color={colors.error} size={64} />
        <Text variant="headlineLarge" style={styles.heading}>
          Something went wrong!
        </Text>
        <Text variant="labelLarge">
          This is the screen that your users will see in production when an error is thrown. You'll want to customize
          this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you
          want to remove this entirely, check `app/app.tsx` for the ErrorBoundary component.
        </Text>
      </View>

      <ScrollView style={styles.errorSection} contentContainerStyle={styles.errorSectionContentContainer}>
        <Text style={styles.errorText}>{`${props.error}`.trim()}</Text>
        <Text style={styles.errorBacktrace}>{props.errorInfo?.componentStack ?? ''}</Text>
      </ScrollView>

      <Button style={styles.resetButton} onPress={props.onReset}>
        RESET APP
      </Button>
    </Screen>
  )
}
