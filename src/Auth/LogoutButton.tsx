import { Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  )
}

export default LogoutButton
