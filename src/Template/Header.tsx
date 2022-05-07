import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

import AuthenticationButton from '../Auth/AuthenticationButton';
import MenuIcon from '@mui/icons-material/Menu';

interface IProps {}

const Header = (props: IProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Farkistani Web Tools
        </Typography>
        <AuthenticationButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
