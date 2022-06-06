import { Typography, styled } from '@mui/material'

const Container = styled('div')({
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(256,256,256,0.5)',
  position: 'fixed',
  margin: '0px auto',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const LoadingScreen = () => {
  return (
    <Container>
      <div>
        <img
          src="/cheers.gif"
          alt='Two beers hitting each other like a "cheers"'
        />
        <Typography variant="h5" color="#444444">
          Loading...
        </Typography>
      </div>
    </Container>
  )
}
