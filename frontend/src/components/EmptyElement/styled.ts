import { Paper, styled } from '@mui/material';

export const EmptyLayout = styled('div')({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ImageContainer = styled(Paper)(({ theme }) => ({
  width: '70%',
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  textAlign: 'center',
  background: 'white',
  padding: '2rem',
  [`@media screen and (max-width: ${theme.breakpoints.values.md}px)`]: {
    width: '100%',
    height: '80%',
    '& > img': {
      width: '100%',
    },
  },
}));
