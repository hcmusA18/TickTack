import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Screen } from '../components'
import { AppStackScreenProps } from '../navigators'
import { spacing } from '../theme'
import { Button } from 'react-native-paper'

interface HomePageProps extends AppStackScreenProps<'Home'> {}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: '57%',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg
  },
  welcomeTextStyles: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export const HomePage: FC<HomePageProps> = (props) => {
  const { navigation } = props

  return (
    <Screen preset="fixed" safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.welcomeTextStyles}>Login successfully</Text>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('Login')
        }}>
        Logout
      </Button>
    </Screen>
  )
}
