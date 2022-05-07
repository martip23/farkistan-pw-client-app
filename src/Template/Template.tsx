import { FarkPurple } from '../Utilities/Constants';
import Header from './Header';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  width: '100vw',
  height: '100vh',
  textAlign: 'center',
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  // backgroundColor: FarkPurple,
});

export const Template = () => {
  return (
    <Container>
      <Header></Header>
    </Container>
  );
};
