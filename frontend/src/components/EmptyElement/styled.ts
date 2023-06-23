import { Paper, styled } from '@mui/material';

export const EmptyLayout = styled('div')({
  marginTop: '3rem'
});

export const ImageContainer = styled(Paper)(({ theme }) => ({
 // width: '70%',
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  textAlign: 'center',
  background: 'white',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  paddingBottom: '0.5rem',
  paddingTop: '0.5rem',
  [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
    width: '100%',
    height: '80%',
    '& > img': {
      width: '100%',
    },
  },
}));
