import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, ViewStyle } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { Screen } from "../components"
import { StyleService, useStyleSheet, Text } from "@ui-kitten/components"
import { spacing } from "../theme"

interface LoginPageProps extends AppStackScreenProps<"Login"> {}

const themedStyles = StyleService.create({
    contentContainer: {
        paddingVertical: spacing.xxl,
        paddingHorizontal: spacing.lg,
    } as ViewStyle,
})

export const LoginPage: FC<LoginPageProps> = (props) => {
  const authPasswordInput = useRef<TextInput>(null)
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [token, setToken] = useState<string>("")
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [attemptCount, setAttemptCount] = useState<number>(0)

  const styles = useStyleSheet(themedStyles)

  const error = isSubmitted && attemptCount >= 3

  const login = () => {
    setIsSubmitted(true)
    setAttemptCount(attemptCount + 1)

    setIsSubmitted(false)
    setPassword("")
    setEmail("")

    setToken(String(Date.now()))
  }

  return (
    <Screen preset="auto" contentContainerStyle={styles.contentContainer} safeAreaEdges={["top", "bottom"]}>
      <Text category="h1">Login</Text>
      <TextInput
        ref={authPasswordInput}
        secureTextEntry={!isPasswordVisible}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={login}
        returnKeyType="done"
        blurOnSubmit={false}
      />
    </Screen>
  )
}
