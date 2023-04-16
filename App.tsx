import React from 'react'
import Navigation from './navigation'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

const App = () => {
  return (
    <>
      <StatusBar animated style='dark' />
      <Navigation />
    </>
  )
}

export default App