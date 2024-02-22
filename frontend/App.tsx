import App from './src/app'
import React, { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import firebase from '@react-native-firebase/app'

SplashScreen.preventAutoHideAsync()
const TickTackApp = () => {
  useEffect(() => {
    firebase.initializeApp({
      apiKey: 'AIzaSyCdREdzP-EznJqxXw644IZ-rUBR1SDAfgw',
      authDomain: 'ticktack-b2753.firebaseapp.com',
      projectId: 'ticktack-b2753',
      storageBucket: 'ticktack-b2753.appspot.com',
      messagingSenderId: '965788674401',
      appId: '1:965788674401:web:66e9cc2da64911fd3e7d20',
      measurementId: 'G-3YGJF93SSN'
    })
  })

  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default TickTackApp
