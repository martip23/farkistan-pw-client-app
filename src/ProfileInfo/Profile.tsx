import { Card, CardContent, CardMedia, List, ListItem } from '@mui/material'
import { gql, useQuery } from '@apollo/client'

import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  interface UserData {
    user: User
  }

  interface User {
    discordId: number
    nationId: number
    discordName: string
    nationUsername: string
    nationName: string
    serverNames: {
      serverName: string
    }[]
  }

  const GET_USER = gql`
    query User($discordId: Int!) {
      user(discordId: $discordId) {
        discordId
        nationId
        discordName
        serverNames {
          serverName
        }
        nationName
        nationUsername
      }
    }
  `

  interface UserVars {
    discordId: number
  }

  const { loading, data } = useQuery<UserData, UserVars>(GET_USER, {
    variables: { discordId: 1 },
  })

  if (isLoading || loading) {
    return <div>Loading ...</div>
  }

  console.log(data?.user.serverNames)

  return isAuthenticated ? (
    <Card>
      <CardMedia>
        <img src={user?.picture ?? 'Unknown'} alt={'User Custom Profile'} />
      </CardMedia>
      <CardContent>
        <h2>Discord Name: {data?.user.discordName ?? 'Unknown'}</h2>
        <List>
          <ListItem>Nation ID: {data?.user.nationId ?? 'Unknown'}</ListItem>
          <ListItem>Discord ID: {data?.user.discordId ?? 'Unknown'}</ListItem>
          <ListItem>Nation Name: {data?.user.nationName ?? 'Unknown'}</ListItem>
          <ListItem>
            Nation Username: {data?.user.nationUsername ?? 'Unknown'}
          </ListItem>
          <ListItem>
            Registered Servers:{' '}
            {data?.user.serverNames
              .map((serverName) => serverName.serverName)
              .join(', ') ?? 'Unknown'}
          </ListItem>
        </List>
      </CardContent>
    </Card>
  ) : (
    <></>
  )
}

export default Profile
