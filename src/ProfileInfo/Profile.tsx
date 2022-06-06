import { Card, CardContent, CardMedia, List, ListItem } from '@mui/material'
import { GET_USER, UserData, UserVars } from '../graphql/GetUser'

import { LoadingScreen } from '../Template/LoadingScreen'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@apollo/client'

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  const { loading, data, error } = useQuery<UserData, UserVars>(GET_USER, {
    variables: { discordId: user?.sub?.split('|')[2] ?? '' },
    skip: !user,
  })

  if (error) console.error(error)

  if (loading || isLoading) {
    return <LoadingScreen />
  }

  return isAuthenticated && data && user ? (
    <Card>
      <CardMedia>
        <img src={user.picture ?? 'Unknown'} alt={'User Custom Profile'} />
      </CardMedia>
      <CardContent>
        <h2>Discord Name: {data.user.discordName ?? 'Unknown'}</h2>
        <List>
          <ListItem>Nation ID: {data.user.nationId ?? 'None'}</ListItem>
          <ListItem>Discord ID: {data.user.discordId ?? 'Unknown'}</ListItem>
          <ListItem>Nation Name: {data.user.nationName ?? 'None'}</ListItem>
          <ListItem>
            Nation Username: {data.user.nationUsername ?? 'None'}
          </ListItem>
          <ListItem>
            Registered Servers:
            {data.user.serverData.length > 0
              ? data.user.serverData
                  .map((serverName) => serverName.serverName)
                  .join(', ') ?? 'Unknown'
              : ' None'}
          </ListItem>
        </List>
      </CardContent>
    </Card>
  ) : (
    <>No Profile Data. Are you logged in?</>
  )
}

export default Profile
