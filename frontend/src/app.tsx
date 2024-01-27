import { useFonts } from 'expo-font'
import React from 'react'
import 'libs/utils/ignoreWarnings'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import * as Linking from 'expo-linking'
import * as storage from 'libs/utils/storage'
import Config from 'configs'
import { customFontsToLoad } from './theme'
import { ViewStyle } from 'react-native'
import { AppNavigator, useNavigationPersistence } from './navigators'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { ErrorBoundary } from 'pages/ErrorPage/ErrorBoundary'
import { Provider } from 'react-redux'
import { store } from 'libs/redux'

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'

// Web linking configuration
// Guide: https://reactnavigation.org/docs/configuring-links/
const prefix = Linking.createURL('/')
const config = {
  screens: {
    Welcome: 'welcome',
    Home: 'home'
  }
}

interface AppProps {
  hideSplashScreen: () => Promise<boolean>
}

// Root component
const App = (props: AppProps) => {
  const { hideSplashScreen } = props
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [fontLoaded] = useFonts(customFontsToLoad)

  // Hide splash screen on app load
  React.useEffect(() => {
    setTimeout(hideSplashScreen, 500)
  }, [])
  if (!fontLoaded || !isNavigationStateRestored) return null

  const linking = {
    prefixes: [prefix],
    config
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <GestureHandlerRootView style={containerStyle}>
          <Provider store={store}>
            <PaperProvider>
              <AppNavigator
                linking={linking}
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </PaperProvider>
          </Provider>
        </GestureHandlerRootView>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default App

const containerStyle: ViewStyle = {
  flex: 1
}
