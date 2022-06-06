import { AppBar, Toolbar, Typography } from '@mui/material'

import AuthenticationButton from '../Auth/AuthenticationButton'
import { MainMenuItems } from './NavMenu/MenuConfigs'
import { NavMenu } from './NavMenu/NavMenu'

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <NavMenu config={MainMenuItems} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Farkistani Web Tools
        </Typography>
        <AuthenticationButton />
      </Toolbar>
    </AppBar>
  )
}

export default Header
