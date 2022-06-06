import { gql } from '@apollo/client'

export interface UserVars {
  discordId: string
}

export const GET_USER = gql`
  query User($discordId: String!) {
    user(discordId: $discordId) {
      discordId
      nationId
      discordName
      serverData {
        serverName
        roles
      }
      nationName
      nationUsername
      nationVerified
    }
  }
`

export interface UserData {
  user: User
}

export interface User {
  discordId: number
  nationId: number
  discordName: string
  nationUsername: string
  nationName: string
  nationVerified: boolean
  serverData: {
    serverName: string
    roles: string[]
  }[]
}
