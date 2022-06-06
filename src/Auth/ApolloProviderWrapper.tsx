import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { ReactNode, useEffect, useState } from 'react'

import { setContext } from '@apollo/client/link/context'
import { useAuth0 } from '@auth0/auth0-react'

/**
 * This file provides a wrapper for ApolloProvider.
 * It should be a child of an auth0 instance so authorization headers can
 * be automatically appended to apollo requests
 */
export const ApolloProviderWrapper = (props: IProps) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:5050',
  })

  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  const [token, setToken] = useState('')

  useEffect(() => {
    let token = ''

    const fetchToken = async () => {
      try {
        if (!isAuthenticated) return
        token = await getAccessTokenSilently()
      } catch (error) {
        console.error(error)
      } finally {
        setToken(token)
      }
    }

    fetchToken()
  }, [getAccessTokenSilently, isAuthenticated])

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}

interface IProps {
  children: ReactNode
}
