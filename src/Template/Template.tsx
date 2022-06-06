import { Route, Routes } from 'react-router-dom'

import Header from './Header'
import { LinkNation } from '../ProfileInfo/LinkNation'
import { LoadingScreen } from './LoadingScreen'
import Profile from '../ProfileInfo/Profile'
import { styled } from '@mui/material/styles'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

const FlexContainer = styled('div')({
  width: '100vw',
  height: '100vh',
  textAlign: 'center',
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
})

export const Template = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated) return

    getAccessTokenSilently()
  }, [getAccessTokenSilently, isAuthenticated])

  return (
    <div>
      <FlexContainer>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/link-nation" element={<LinkNation />} />
        </Routes>
      </FlexContainer>
      {isLoading ? <LoadingScreen /> : <></>}
    </div>
  )
}
