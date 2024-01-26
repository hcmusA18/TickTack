import React, { ErrorInfo } from 'react'
import { Layout, Text, Button, Icon } from '@ui-kitten/components'
import { ScrollView, TextStyle, ViewStyle } from 'react-native'
import { colors, spacing } from '../../theme'
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components'
import { Screen } from '../../components/Screen'

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset: () => void
}

const themedStyles = StyleService.create({
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
  const styles = useStyleSheet(themedStyles)

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <Layout style={styles.topSection}>
        <Icon name="alert-circle-outline" fill={colors.error} style={{ width: 64, height: 64 }} />
        <Text category="h1" style={styles.heading}>
          Something went wrong!
        </Text>
        <Text category="s1">
          This is the screen that your users will see in production when an error is thrown. You'll want to customize
          this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you
          want to remove this entirely, check `app/app.tsx` for the ErrorBoundary component.
        </Text>
      </Layout>

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
