import DialPadIcon from '@mui/icons-material/Dialpad'
import InfoIcon from '@mui/icons-material/Info'
import MenuIcon from '@mui/icons-material/Menu'
import NoiseAwareIcon from '@mui/icons-material/NoiseAware'

export interface IMenuItem {
  text: string
  icon: any
  onClick: () => void
}

export const MainMenuItems: IMenuItem[] = [
  {
    text: 'Home',
    icon: MenuIcon,
    onClick: () => {},
  },
  {
    text: 'About Us',
    icon: InfoIcon,
    onClick: () => {},
  },
  {
    text: 'Contact Us',
    icon: DialPadIcon,
    onClick: () => {},
  },
  {
    text: 'www',
    icon: NoiseAwareIcon,
    onClick: () => {},
  },
]
