import React, { useState } from 'react'
import Navigation from './navigation'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import SplashScreen from './screens/Splash'

const App = () => {
  const [isLoading, setLoading] = useState(true);

  if (isLoading) {
    return (
      <SplashScreen setLoading={setLoading} />
    )
  }

  return (
    <>
      <StatusBar animated style='dark' />
      <Navigation />
    </>
  )
}

export default App