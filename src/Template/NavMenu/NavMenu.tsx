import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { IMenuItem } from './MenuConfigs'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'

interface IProps {
  config: IMenuItem[]
}

export const NavMenu = (props: IProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen)
  }

  const list = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer()}>
      <List>
        {props.config.map((menuItem) => {
          return (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  menuItem.onClick()
                  toggleDrawer()
                }}
              >
                <ListItemIcon>
                  <menuItem.icon />
                </ListItemIcon>
                <ListItemText primary={menuItem.text} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => toggleDrawer()}
      >
        <Drawer anchor="left" open={drawerOpen}>
          {list}
        </Drawer>
        <MenuIcon />
      </IconButton>
    </div>
  )
}
