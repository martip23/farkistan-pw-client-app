import { Card, CardContent, CardMedia } from '@mui/material'
import { GET_USER, UserData, UserVars } from '../graphql/GetUser'

import { LoadingScreen } from '../Template/LoadingScreen'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@apollo/client'

export const LinkNation = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  const { loading, data, error } = useQuery<UserData, UserVars>(GET_USER, {
    variables: { discordId: user?.sub?.split('|')[2] ?? '' },
    skip: !user,
  })

  if (loading || isLoading) {
    return <LoadingScreen />
  }

  return isAuthenticated && data && user ? (
    <Card>
      <CardMedia>
        <img src={user.picture ?? 'Unknown'} alt={'User Custom Profile'} />
        {data.user.nationVerified ? (
          <>
            <div>Nation already linked.</div>
            <p>
              To change linked nation, contact Tokey#9411 (RhealLuhb) in discord
              for approval
            </p>
          </>
        ) : (
          <div>Link Nation Form</div>
        )}
      </CardMedia>
      <CardContent></CardContent>
    </Card>
  ) : (
    <>No Profile Data. Are you logged in?</>
  )
}
