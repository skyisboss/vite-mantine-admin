import React from 'react'
import { MantineProvider, createTheme } from '@mantine/core'
import AppRoute from './router'
import '@mantine/core/styles.css'
import './app.css'
import '@/i18n'

function App() {
  const theme = createTheme({
    /* Put your mantine theme override here */
  })

  return (
    <React.StrictMode>
      <MantineProvider theme={theme}>
        <AppRoute />
      </MantineProvider>
    </React.StrictMode>
  )
}

export default App
