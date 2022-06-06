import './index.css'

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { DarkGray, FarkPurple } from './Utilities/Constants'

import { ApolloProviderWrapper } from './Auth/ApolloProviderWrapper'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Template } from './Template/Template'
import reportWebVitals from './reportWebVitals'

const theme = createTheme({
  palette: {
    secondary: {
      main: DarkGray,
    },
    background: {
      default: FarkPurple,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Auth0Provider
        domain="dev-xhex-dy1.us.auth0.com"
        clientId="jgIE0XHNom6uK4tFAZ1FX2Ts7hFqV50R"
        redirectUri={window.location.origin}
        audience="https://dev-xhex-dy1.us.auth0.com/api/v2/"
        scope="read:current_user update:current_user_metadata"
      >
        <ApolloProviderWrapper>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Template />
          </ThemeProvider>
        </ApolloProviderWrapper>
      </Auth0Provider>
    </React.StrictMode>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
