import './index.css'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { DarkGray, FarkPurple } from './Utilities/Constants'

import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Template } from './Template/Template'
import reportWebVitals from './reportWebVitals'

const httpLink = createHttpLink({
  uri: 'http://localhost:5050',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

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
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Template />
          </ThemeProvider>
        </ApolloProvider>
      </Auth0Provider>
    </React.StrictMode>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
