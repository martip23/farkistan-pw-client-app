import Header from './Header'
import Profile from '../ProfileInfo/Profile'
import { styled } from '@mui/material/styles'

const Container = styled('div')({
  width: '100vw',
  height: '100vh',
  textAlign: 'center',
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
})

export const Template = () => {
  return (
    <Container>
      <Header></Header>
      <Profile />
    </Container>
  )
}
