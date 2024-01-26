import React, { FC } from "react"
import { View, Text, TextStyle } from "react-native"
import { Screen } from "../components"
import { AppStackScreenProps } from "../navigators"
import { Button, StyleService, useStyleSheet } from "@ui-kitten/components"
import { spacing } from "../theme"

interface WelcomePageProps extends AppStackScreenProps<"Welcome"> {}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: "57%",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  welcomeTextStyles: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
})

export const WelcomePage: FC<WelcomePageProps> = (props) => {
  const { navigation } = props

  const styles = useStyleSheet(themedStyles)

  const goNext = () => {
    navigation.navigate("Login")
  }

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={styles.container}
    >
      <View style={styles.topContainer}>
        <Text style={styles.welcomeTextStyles}>Welcome to TickTack</Text>
        <Button onPress={goNext}>Go to Login</Button>
      </View>
    </Screen>
  )
}
